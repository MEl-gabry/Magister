import { createHash } from "crypto";
import firebase from "../db.js";

function hashPassword(password) {
    return createHash("sha1").update(password).digest("base64");
}

export default async function(_req, res, search) {
    const users = await firebase.get("/users") ?? {};

    if(search.create == "on") {
        if(Object.entries(users).some(([, { name }]) => name == search.username)) {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end(
                `<h1>A user with the username '${search.username}'
                    already exists</h1>`
            );
            return;
        }

        firebase.post("/users", {
            name: search.username,
            pass: hashPassword(search.password),
            teacher: search.teacher == "on",
            completed_assignments: [-1, -2, -3],
            assignment_results: { [-1]: "0/0" }
        })
            .then(({ name }) => {
                res.writeHead(301, {
                    "Set-Cookie": `token=${name}; path=/`,
                    "Location": "/dashboard.html",
                });
                res.end();
            })
            .catch(() => {
                res.writeHead(400, { "Content-Type": "text/html" });
                res.end("<h1>Internal server error</h1>");
            });

        return;
    }

    const userid = Object.entries(users).find(([, { name, pass }]) =>
        name == search.username && pass == hashPassword(search.password))?.[0];
    if(!userid) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>User not found, or incorrect password</h1>");
        return;
    }

    res.writeHead(301, { 
        "Set-Cookie": `token=${userid}; path=/`,
        "Location": "/dashboard.html"
    });
    res.end();
}