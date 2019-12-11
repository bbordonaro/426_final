var jwt = getUrlVars().jwt;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

const renderQuestion = function (q) {
    return `
    <div class="question"><p>${q.question}</p>
    <div class="option a ${q.id}">${q.answers.a}</div>
    <div class="option b ${q.id}">${q.answers.b}</div>
    <div class="option c ${q.id}">${q.answers.c}</div>
    <div class="option d ${q.id}">${q.answers.d}</div></div>`;
};

const getResults = function (choices) {
    
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
        place = results[2];
        console.log(place);
    } else if (result == "b") {
        place = results[3];
    } else if (result == "c") {
        place = results[1];
    } else {
        place = results[0];
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

    //adding places to running count of places
    for (let i = 1; i < 4; i++) {
        async function addPlace() {
            let target = place.places[i].name;
            try {
                await axios({
                    method: 'get',
                    url: 'http://localhost:3000/private/places/' + target,
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    }
                }).then(x => {
                    let newCount = x.data.result + 1;
                    async function deleteCount() {
                        await axios({
                            method: 'delete',
                            url: 'http://localhost:3000/private/places/' + target,
                            headers: {
                                'Authorization': 'Bearer ' + jwt
                            }
                        });
                    }
                    deleteCount();

                    async function updateCount() {
                        await axios({
                            method: 'post',
                            url: 'http://localhost:3000/private/places/' + target,
                            headers: {
                                'Authorization': 'Bearer ' + jwt
                            },
                            data: {
                                "data": newCount
                            }
                        });
                    }
                    updateCount();
                });

            } catch (error) {
                await axios({
                    method: 'post',
                    url: 'http://localhost:3000/private/places/' + target,
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    },
                    data: {
                        "data": 1
                    }
                });
            }
        }
        addPlace();
    }

    return place;
};

$(function () {
    const form = $('#form1');
    if (jwt == "undefined") {
        form.append(`<div id="alert">Please login or create an account to take our travel quiz!</div>`);
        form.append(`<div class="profile_button">Login or Create an Account</div>`);
        $(".profile_button").on("click", function () {
            window.location.href = "login.html?jwt=" + jwt
        });
    } else {
        //check if quiz results exist
        async function checkResults() {
            try {
                const result = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/user/results',
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    }
                });
                return true;
            } catch (error) {
                return false;
            }
        }
        checkResults().then(result => {
            if (result == true) {
                $("#quiz_message").append(`Warning: You already have saved quiz results. Re-submitting will re-write your results.`);
            }
        });


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
            $("#quiz_message").empty();
            var count = 0;
            for (var question in choices) {
                if (choices[question] == "z") {
                    count++;
                }
            }
            if (count != 0) {
                $("#quiz_message").append(`You need to answer ${count} more questions!`);
            } else {
                event.target.remove();
                $("#quiz_message").empty();
                var category_obj = getResults(choices);
                var cat = category_obj.category;
                var places = [category_obj.places[1], category_obj.places[2], category_obj.places[3]];
                $("#main").append(`
                <div id="results">
                    <h2>You got a(n) ${cat} vacation!</h2>
                    <p><span class =  "location">${places[0].name}:</span>   ${places[0].description}</p>
                    <p><span class =  "location">${places[1].name}:</span>   ${places[1].description}</p>
                    <p><span class =  "location">${places[2].name}:</span>   ${places[2].description}</p>
                </div>
                <button id="to_map">See Your Results on the Map!</button>
            
            `);
                $('#to_map').on("click", function () {
                    window.location.href = "map.html?jwt=" + jwt;
                });
            }
        });
    }
});