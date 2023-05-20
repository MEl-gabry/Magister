import firebase from "../db.js";

export default async function(req, res, search) {
    //const courses = (await firebase.get(`/users/${req.cookies().token}`))?.courses ?? [];
    //await firebase.put(`/users/${req.cookies().token}/courses/${courses.length}`, Number(search.id));
    res.writeHead(200);
    let out = JSON.stringify(await firebase.get("/assignments/" + search?.id));
    res.end(out);
}