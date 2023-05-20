import firebase from "../db.js";

export default async function(req, res, search) {
    const origCompleted = await firebase.get(`/users/${req.cookies()?.token}/completed_assignments`);
    //console.log(origCompleted);
    firebase.put( `/users/${req.cookies()?.token}/completed_assignments/${origCompleted?.length}`, Number.parseInt(search.id) );

    const assignment = await firebase.get(`/assignments/${search.id}`);
    const questions = assignment.questions;

    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].correct == Number.parseInt(search["q"+i]))
            correct++;
    }
    await firebase.put(`/users/${req.cookies()?.token}/assignment_results/${search.id}`, `${correct}/${questions.length}`)

    res.writeHead(301, {Location: "/assignment_results?id=" + search.id});
    res.end( /* "<h1>Assignment Submitted!</h1>" */ );
}