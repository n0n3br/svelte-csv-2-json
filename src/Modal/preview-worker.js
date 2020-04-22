self.onmessage = (params) => {
    const { file, separator, decimal, hasHeaders } = params.data;
    const reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target.result;
        const lines = fileContent
            .replace(/(?:[\r])+/g, "")
            .split("\n")
            .map((l) => l.split(separator));
        const count = !lines.length
            ? 0
            : lines
                  .map((l) => l.length)
                  .sort()
                  .reverse()[0];
        const previewLines = lines.slice(
            hasHeaders ? 1 : 0,
            hasHeaders ? 11 : 10
        );
        const headers =
            hasHeaders && lines.length
                ? lines[0]
                : Array.from(Array(count).keys()).map((i) => `Column ${i + 1}`);
        self.postMessage({ lines: previewLines, headers });
    };

    if (file && separator) reader.readAsText(file);
};
