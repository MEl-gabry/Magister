import firebase from "../db.js";
import me from "./me.js";

export default async function(req, res, search) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const token = req.cookies()?.token;
    let out = await firebase.get(`/courses/${search.id}`);
    if (out)
        out.me = await firebase.get(`/users/${token}`);
    res.end(JSON.stringify(out));
}