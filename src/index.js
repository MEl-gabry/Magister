import { createServer } from "http";
import {  createReadStream, existsSync } from "fs";
import path from "path";

import tryRoute from "./router.js";
import mimes from "./mime.js";

const PORT = 8080;
const ADDRESS = "0.0.0.0";

const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if(req.url == "/") {
        res.writeHead(301, { "Location": "/dashboard.html" });
        res.end();
        return;
    }

    if(tryRoute(req, res)) return;

    let [url] = req.url.split("?");
    if(!url.match(/\..+$/)) url += ".html";

    if(!existsSync(path.join("src/views", url))) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404");
        return;
    }

    res.writeHead(200, { "Content-Type": mimes[url.match(/\.(.+?)$/)?.[1]] ?? "text/plain" });
    createReadStream(path.join("src/views", url))
        .on("error", () => {
            res.end("Unable to open file");
        })
        .pipe(res);
});

server.listen(PORT, ADDRESS, () => {
    console.log(`server listening on http://${ADDRESS}:${PORT}`);
});