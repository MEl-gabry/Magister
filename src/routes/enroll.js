import firebase from "../db.js";

export default async function(req, res, search) {
    const courses = (await firebase.get(`/users/${req.cookies().token}`))?.courses ?? [];
    await firebase.put(`/users/${req.cookies().token}/courses/${courses.length}`,
        { id: Number(search.id) });
    res.writeHead(301, { "Location": "/dashboard.html" });
    res.end();
}