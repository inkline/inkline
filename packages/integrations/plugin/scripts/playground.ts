import { resolve } from "pathe";
import fs from "fs/promises";

(async () => {
    const indexHtmlTemplatePath = resolve(
        __dirname,
        "../playground/index.html",
    );
    const indexHtmlTemplate = await fs.readFile(indexHtmlTemplatePath, "utf-8");
    const viteContents = indexHtmlTemplate.replace(
        "</body>",
        '\n<script type="module" src="./main.ts"></script>\n</body>',
    );

    await fs.writeFile(
        resolve(__dirname, "../playground/vite/index.html"),
        viteContents,
    );
    await fs.writeFile(
        resolve(__dirname, "../playground/webpack/index.html"),
        indexHtmlTemplate,
    );
})();
