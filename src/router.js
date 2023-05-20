import { IncomingMessage } from "http";
import { readdirSync, lstatSync } from "fs";
import path from "path";

IncomingMessage.prototype.cookies = function() {
    return Object.fromEntries(
        new URLSearchParams(this.headers.cookie?.replace(/; /g, "&") ?? "")
    );
}

const viableRoutes = {};
(function findViableRoutes(src) {
    const routesDir = path.join("src/routes/", src);
    readdirSync(routesDir).forEach(async (fname) => {
        if(lstatSync(path.join("src/routes/", src, fname)).isDirectory()) {
            findViableRoutes(path.join(src, fname));
            return;
        }

        viableRoutes["/api/" + path.join(src, fname.replace(/\.js$/, ""))] =
            (await import(`file:///${path.resolve("src/routes/", src, fname)}`)).default;
    });
})(".");

/**
 * @returns {boolean}
 */
export default function tryRoute(req, res) {
    const [url, search] = req.url.split("?");
    if(url in viableRoutes) {
        viableRoutes[url](req, res, Object.fromEntries(new URLSearchParams(search)));
        return true;
    }
    return false;
}