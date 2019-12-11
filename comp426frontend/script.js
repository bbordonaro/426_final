var jwt = getUrlVars().jwt;
var map;

async function initMap() {
    map = new google.maps.Map(document.getElementById('map2'), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2,
        scrollwheel: false,
    });

    //get the user 
    if (jwt != "undefined") {
        async function getPoints() {
            await axios({
                method: 'get',
                url: 'http://localhost:3000/user/results',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            }).then(y => {
                let content1 =
                    '<div class="markercontent">' + y.data.result.places[1].name + "<p class='markerP'>Click the blue pin again for more info!</p>" +
                    '</div>';
                let point1 = y.data.result.places[1].point;
                let infowindow1 = new google.maps.InfoWindow({
                    content: content1
                });
                let marker1 = new google.maps.Marker({
                    position: point1,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });
                marker1.addListener('click', openWindow1);

                function openWindow1() {
                    infowindow1.open(map, marker1);
                    google.maps.event.clearInstanceListeners(marker1);
                    marker1.addListener('click', newPage1);
                }

                infowindow1.addListener('closeclick', windowClose1);

                function windowClose1() {
                    google.maps.event.clearInstanceListeners(marker1);
                    marker1.addListener('click', openWindow1);
                }

                function newPage1() {
                    window.location.href = "search.html?jwt=" + jwt + "&place=" + y.data.result.places[1].name;
                }

                let content2 =
                    '<div class="markercontent">' + y.data.result.places[2].name + "<p class='markerP'>Click the blue pin again for more info!</p>" +
                    '</div>';
                let point2 = y.data.result.places[2].point;
                let infowindow2 = new google.maps.InfoWindow({
                    content: content2
                });
                let marker2 = new google.maps.Marker({
                    position: point2,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });
                marker2.addListener('click', openWindow2);

                function openWindow2() {
                    infowindow2.open(map, marker2);
                    google.maps.event.clearInstanceListeners(marker2);
                    marker2.addListener('click', newPage2);
                }

                infowindow2.addListener('closeclick', windowClose2);

                function windowClose2() {
                    google.maps.event.clearInstanceListeners(marker2);
                    marker2.addListener('click', openWindow2);
                }

                function newPage2() {
                    window.location.href = "search.html?jwt=" + jwt + "&place=" + y.data.result.places[2].name;
                }

                let content3 =
                    '<div class="markercontent">' + y.data.result.places[3].name + "<p class='markerP'>Click the blue pin again for more info!</p>" +
                    '</div>';
                let point3 = y.data.result.places[3].point;
                let infowindow3 = new google.maps.InfoWindow({
                    content: content3
                });
                let marker3 = new google.maps.Marker({
                    position: point3,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });
                marker3.addListener('click', openWindow3);

                function openWindow3() {
                    infowindow3.open(map, marker3);
                    google.maps.event.clearInstanceListeners(marker3);
                    marker3.addListener('click', newPage3);
                }

                infowindow3.addListener('closeclick', windowClose3);

                function windowClose3() {
                    google.maps.event.clearInstanceListeners(marker3);
                    marker3.addListener('click', openWindow3);
                }

                function newPage3() {
                    window.location.href = "search.html?jwt=" + jwt + "&place=" + y.data.result.places[3].name;
                }

            });
        }
        getPoints();
    }
}

const clickedWindow = function () {
    //var place = event.target.closest("#nameTag").value;
    console.log("CLICKED");
    //window.location.href = "search.html?jwt=" + jwt + "&place=" + place;
}


async function login() {
    event.preventDefault();
    $(`#message`).empty();
    const $form = $('#login-form');
    const data = $form.serializeArray().reduce((o, x) => {
        o[x.name] = x.value;
        return o;
    }, {});
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/login',
            data: {
                "name": data.name,
                "pass": data.password,
            }
        }).then(x => {
            $(`#message`).append("Login successful.");
            jwt = x.data.jwt;
            window.location.href = "index.html?jwt=" + jwt;
        });
    } catch (error) {
        $(`#message`).append("Username or password incorrect.");
    };
}

async function createAccount() {
    event.preventDefault();
    $(`#message`).empty();
    const $form = $('#create-form');
    const data = $form.serializeArray().reduce((o, x) => {
        o[x.name] = x.value;
        return o;
    }, {});

    var now = new Date();
    (now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' +
        ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()));

    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": data.name,
                "pass": data.password,
                "data": {
                    "timestamp": now
                }
            }
        }).then(function () {
            $('#message').append("Account successfully created on " + now);

            //updating user number 

            async function readCurrent() {
                try {
                    let result = await axios({
                        method: 'get',
                        url: 'http://localhost:3000/public/users',
                    });
                    let newCount = result.data.result + 1;
                    console.log(newCount);
                    //update to new count
                    async function updateCount() {
                        const result2 = await axios({
                            method: 'post',
                            url: 'http://localhost:3000/public/users',
                            data: {
                                "data": newCount
                            }
                        });
                        console.log(result2.data);
                    }
                    updateCount();
                } catch (error) {
                    async function createCount() {
                        await axios({
                            method: 'post',
                            url: 'http://localhost:3000/public/users',
                            data: {
                                "data": 1
                            }
                        });
                    }
                    createCount();
                }
            }
            readCurrent();


            //auto log in 
            async function autoLogin() {
                try {
                    const result = await axios({
                        method: 'post',
                        url: 'http://localhost:3000/account/login',
                        data: {
                            "name": data.name,
                            "pass": data.password,
                        }
                    }).then(x => {
                        $(`#message`).append("Login successful.");
                        jwt = x.data.jwt;
                        window.location.href = "index.html?jwt=" + jwt;
                    });
                } catch (error) {

                }
            }
            autoLogin();
        });
    } catch (error) {
        $(`#message`).append("Username already taken.");
    };
}

const loginPage = function () {
    window.location.href = "login.html?jwt=" + jwt;
}

const loadPage = function () {
    if (window.location.href == "http://localhost:3001") {
        window.location.href = "index.html?jwt=" + jwt;
    }

    $('.create_button').on("click", createAccount);
    $('.login_button').on("click", login);
    $('.profile_button').on("click", loginPage);

    if (jwt != undefined && jwt != "undefined") {
        $('.profile_button').empty();
        $('.profile_button').unbind("click", loginPage);

        //get logged in username
        async function getUser() {
            await axios({
                method: 'get',
                url: 'http://localhost:3000/account/status',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            }).then(x => {
                $("#profileStatus").append("Hello, " + x.data.user.name + "!");
                $('.profile_button').append("Log Out");
            })
        }
        getUser();
        $('.profile_button').on("click", function () {
            jwt = "undefined";
            window.location.href = "index.html?jwt=" + jwt;
        });
    }

    $('.quiz_link').on("click", function () {
        window.location.href = "quiz.html?jwt=" + jwt;
    });
    $('.map').on("click", function () {
        window.location.href = "map.html?jwt=" + jwt;
    });
    $('.index_button').on("click", function () {
        window.location.href = "index.html?jwt=" + jwt;
    });
    $('.quiz_button').on("click", function () {
        window.location.href = "quiz.html?jwt=" + jwt;
    });
    $('#title').on("click", function () {
        window.location.href = "index.html?jwt=" + jwt;
    });

    if (document.querySelectorAll('#map2').length > 0) {
        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyC3aifUfdZHFzieQOo96mftM4hGZ3E8BpM';
        document.getElementsByTagName('body')[0].appendChild(js_file);
    }

    let rankDiv = $("#ranks");
    rankDiv.append("Log in to see the top trending vacation spots!");

    //get the updated ranks and display 
    if (jwt != undefined && jwt != "undefined") {
        async function displayRanks() {
            try {
                await axios({
                    method: 'get',
                    url: 'http://localhost:3000/private/places',
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    }
                }).then(x => {
                    rankDiv.empty();
                    let title = $("<div></div>").attr("id", "rankTitle").append("Here are the top 5 locations our users have discovered so far:");
                    rankDiv.append(title);
                    let places = x.data.result;
                    let placesArray = Object.entries(places);
                    placesArray.sort(function (a, b) {
                        return b[1] - a[1];
                    });
                    let count = 1;
                    for (let i = 0; i < 5; i++) {
                        let place = $("<div></div");
                        place.append(count + ". " + placesArray[i][0] + ": ");
                        place.append(placesArray[i][1] + " users");
                        rankDiv.append(place);
                        count++;
                    }
                });
            } catch (error) {
                rankDiv.append("No one has taken our travel quiz yet! Be the first user!");
            }
        }
        displayRanks();
    }

    async function getUsers() {
        try {
            let result = await axios({
                method: 'get',
                url: 'http://localhost:3000/public/users',
            });
            $("#userCount").append("Join the " + "<span id='userNumber'>" + result.data.result + "</span>" + " users who have found great destinations with Hex Girls Travel Agency!");
        } catch (error) {
            $("#userCount").append("No users yet, be our first and create an account!");
        }
    }
    getUsers();
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

$(function () {
    loadPage();
});