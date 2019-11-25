document.getElementById("form1").onsubmit=function() {


    // age = parseInt(document.querySelector('input[name = "age"]:checked').value);

    // activity = parseInt(document.querySelector('input[name = "activity"]:checked').value);

    // genre = parseInt(document.querySelector('input[name = "genre"]:checked').value);

    // total= age + activity + genre;


    // document.getElementById("answer").innerHTML = total;

    // if(total < 4) {
    //     document.getElementById("answer2").innerHTML = "You got Quiet Company.";
    // }

    // if(total >=4 && total < 7) {
    //     document.getElementById("answer2").innerHTML = "You got Spoon.";
    // }

    // if(total >=7) {
    //     document.getElementById("answer2").innerHTML = "You got Willie Nelson.";
    // }

    return false; // required to not refresh the page; leave this here
}

const renderQuestion = function(q) {
    return `
    <div class="question"><p>${q.question}</p>
    <div class="option a">${q.answers.a}</div>
    <div class="option b">${q.answers.b}</div>
    <div class="option c">${q.answers.c}</div>
    <div class="option d">${q.answers.d}</div></div>`;
};

$(function() {
    const form = $('#form1');
    
    for(let i=0; i<quiz.length; i++) {
        let temp = renderQuestion(quiz[i]);
        form.append(temp);
    }

    $('.option').on("click", function() {

    });

    form.append(`<button type="submit" value="Submit">Submit</button>`);
});