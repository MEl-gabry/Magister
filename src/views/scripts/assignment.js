const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("id=" + id);
document.querySelector("form").querySelector("input[type=hidden]").value = id;

(async()=>{
    const completed = (await (await fetch("/api/me")).json()).completed_assignments;
    if (completed.includes(Number.parseInt(id))) {
        location = "/assignment_results?id=" + id;
        return;
    }

    const assignment = await (await fetch("/api/assignment?id=" + id)).json();
    const questions = assignment.questions;
    
    document.querySelector("#quiz-title").innerText = assignment.name;

    for (let i in questions) {
        const question = questions[i];

        let questionHTML = `
        <hr>
        <span class="quiz-question-title"> ${question.question} </span> <br>
        <div class="d-flex flex-column">
        `

        for (let j in questions[i].answers) {
            questionHTML += `
            
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="q${i}" id="q${i}-${j}" value="${j}">
                        <label class="form-check-label">
                            ${questions[i].answers[j]}
                        </label>
                    </div>

            <!-- <input type="radio" name="q${i}" id="q${i}-${j}" value="${j}">
            <label for="q${i}-${j}">${questions[i].answers[j]}</label><br> -->
            `
        }

        document.querySelector("#question-container").innerHTML += "</div>" + questionHTML;
    }

    document.querySelector("#question-container").innerHTML += `<br><button type="submit" class="btn btn-primary mt-3">Submit</button>
    `;
})();
