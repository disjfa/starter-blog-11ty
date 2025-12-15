import favicons from "favicons";
import fs from "fs/promises";
import path from "path";

const src = "./logo.png"; // Icon source file path.
const dest = "./favicons"; // Output directory path.
const htmlBasename = "index.html"; // HTML file basename.

// Configuration (see above in the README file).
const configuration = {
  path: "/starter-blog-11ty/favicons",
  appName: "Starter blog 11ty",
  appShortName: "SB 11ty",
  appDescription: "Get started with Eleventy. Also please blog again!",
  backgroundColor: '#fff',
  themeColor: '#2f2e41',
  background: '#000',
  // Extra options...
};

// Below is the processing.
const response = await favicons(src, configuration);
await fs.mkdir(dest, { recursive: true });
await Promise.all(
  response.images.map(
    async (image) =>
      await fs.writeFile(path.join(dest, image.name), image.contents),
  ),
);
await Promise.all(
  response.files.map(
    async (file) =>
      await fs.writeFile(path.join(dest, file.name), file.contents),
  ),
);
await fs.writeFile(path.join(dest, htmlBasename), response.html.join("\n"));
