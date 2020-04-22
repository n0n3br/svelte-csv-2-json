self.onmessage = ({ data }) => {
    const { file, separator, decimal, hasHeaders } = data;
    const decimalRegex = new RegExp("/" + decimal + "/g");
    const reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target.result;
        let lines = fileContent
            .replace(/(?:[\r])+/g, "")
            .split("\n")
            .map((l) =>
                l
                    .split(separator)
                    .map((c) =>
                        isNaN(c.replace(decimalRegex, "."))
                            ? c.toLowerCase() === "null"
                                ? null
                                : c.toLowerCase() === "true"
                                ? true
                                : c.toLowerCase() === "false"
                                ? false
                                : c
                            : Number(c.replace(decimalRegex, "."))
                    )
            );
        const count = !lines.length
            ? 0
            : lines
                  .map((l) => l.length)
                  .sort()
                  .reverse()[0];
        const headers =
            hasHeaders && lines.length
                ? lines[0]
                : Array.from(Array(count).keys()).map((i) => `Column ${i + 1}`);
        if (hasHeaders) lines = lines.slice(1);
        const json = lines.reduce(
            (memo, line) => [
                ...memo,
                line.reduce(
                    (memo, column, index) => ({
                        ...memo,
                        [headers[index]]: column,
                    }),
                    {}
                ),
            ],
            []
        );
        self.postMessage(json);
    };
    if (file && separator && decimal) reader.readAsText(file);
};
