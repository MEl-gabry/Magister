function assignmentNodeHTML(name, type, id) {
    if (type == "assignment") {
        let url = "/assignment.html?id=" + id;
        return `<a href="${url}" target="_blank">${name}</a>`;
    }
    return name;
}

function importAssignments(data, editor, me) {
    //editor.import(data);
    
    for (let assignment in data) {
        editor.addNode(
            data[assignment].id.toString(), 
            data[assignment].type != "start" ? 1 : 0, 
            data[assignment].type != "end" ? 1 : 0, 
            data[assignment].x, 
            data[assignment].y,
            me.completed_assignments?.includes(data[assignment].id) ? "node-completed" : "",
            data[assignment],
            assignmentNodeHTML(data[assignment].name, data[assignment].type, data[assignment].id)
        );
        
        console.log(Number.toString("100000"))
        
        console.log("AAAAAAAAAA");
        console.log(editor.drawflow.drawflow.Home.data);
    }

    for (let assignment in data) {
        for (let prereq_i in data[assignment].prereq) {
            let to = editor.getNodesFromName(
                data[assignment].prereq[prereq_i].toString()
            )[0];

            let from = editor.getNodesFromName(
                data[assignment].id.toString()
            )[0];

            console.log("Connection from, to");
            console.log(from);
            console.log(to);

            editor.addConnection(
                to,
                from,
                "output_1",
                "input_1"
            );
        }
    }
}

var editor;

(async () => {
    var parent = document.querySelector("#course-view");

    editor = new Drawflow(parent);

    editor.editor_mode = "view";

    const id = new URLSearchParams(location.search).get("id");

    const json_info = await (await fetch("/api/course?id=" + id)).json();
    const { assignments: editorData, me: me, course_name: course_name } = json_info;
    //console.log();
    //console.log(editorData);

    document.querySelector("#course-title").innerText = course_name;
    console.log(json_info);

    //editor.editor_mode = "view";
    //editor.import(editorData);
    editor.start();
    importAssignments(editorData, editor, me);
})();

// editor.addNode("name", 1, 2, 100, 100, "class", {}, `
// <h1>AssignmentName</h1>
// `);
