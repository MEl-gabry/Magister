export default function(_req, res) {
    res.writeHead(301, {
        "Set-Cookie": "token=logout; path=/; Max-Age=0",
        "Location": "/login.html"
    });
    res.end();
}