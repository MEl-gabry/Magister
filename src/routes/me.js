import firebase from "../db.js";

export default async function(req, res) { 
    const token = req.cookies()?.token;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(token
        ? await firebase.get(`/users/${token}`)
        : null));
}