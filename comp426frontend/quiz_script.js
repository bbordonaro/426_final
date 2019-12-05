const renderQuestion = function (q) {
    return `
    <div class="question"><p>${q.question}</p>
    <div class="option a ${q.id}">${q.answers.a}</div>
    <div class="option b ${q.id}">${q.answers.b}</div>
    <div class="option c ${q.id}">${q.answers.c}</div>
    <div class="option d ${q.id}">${q.answers.d}</div></div>`;
};

const getResults = function (choices) {
    //count number of each letter
    var counts = {
        a: 0,
        b: 0,
        c: 0,
        d: 0
    }
    for (let i = 1; i < 11; i++) {
        let ans = choices[i];
        if (ans == "a") {
            counts.a++;
        } else if (ans == "b") {
            counts.b++;
        } else if (ans == "c") {
            counts.c++;
        } else if (ans == "d") {
            counts.d++;
        }
    }
    var result = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    var place;
    if (result == "a") {
        place = results[0];
    } else if (result == "b") {
        place = results[1];
    } else if (result == "c") {
        place = results[2];
    } else {
        place = results[3];
    }

    async function setPlace() {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/user/results',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            data: {
                "data": place,
            },
            "type": "merge"
        });
    }
    setPlace();
    return place;
};

$(function () {
    const form = $('#form1');

    for (let i = 0; i < quiz.length; i++) {
        let temp = renderQuestion(quiz[i]);
        form.append(temp);
    }

    var choices = {
        1: "z",
        2: "z",
        3: "z",
        4: "z",
        5: "z",
        6: "z",
        7: "z",
        8: "z",
        9: "z",
        10: "z",
    };

    $('.option').on("click", function () {
        var choice = event.target;
        var classes = choice.className.split(/\s+/);
        var question_clicked = classes[2];
        var letter = classes[1];
        var question = quiz[question_clicked - 1];
        choices[question_clicked] = letter;
        var options = document.getElementsByClassName(question_clicked);
        for (let i = 0; i < 4; i++) {
            let x = options[i];
            let temp = x.className.split(/\s+/)[1];
            if (temp != letter) {
                x.style.backgroundColor = "lightblue";
            } else {
                x.style.backgroundColor = "grey";
            }
        }

    });

    form.append(`<div id = "quiz_submit">Submit</div>`);
    $("#quiz_submit").on("click", function () {
        var count = 0;
        for (var question in choices) {
            if (choices[question] == "z") {
                count++;
            }
        }
        if (count != 0) {
            $("#main").append(`You need to answer ${count} more questions!`);
        } else {
            getResults(choices);
        }
    });
});