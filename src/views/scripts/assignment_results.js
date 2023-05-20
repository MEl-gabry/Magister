const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("id=" + id);

(async()=>{
    const assignment = await (await fetch("/api/assignment?id=" + id)).json();
    const me = await (await fetch("/api/me")).json();

    let results = me.assignment_results[id];

    document.querySelector("h1").innerText = assignment.name;
    document.querySelector("h2").innerHTML = `Your score: <b>${results}</b> `
})();