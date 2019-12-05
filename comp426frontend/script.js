var jwt = getUrlVars().jwt;
var map;

async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2
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
                let heading1 = $("<h1></h1>").append(y.data.result.places[1].name);
                let body1 = $("<p></p>").append(y.data.result.places[1].description);
                let content1 =
                    '<div id="content">' + '<div id="siteNotice">' +
                    '</div>' + y.data.result.places[1].name +
                    '<div id="bodyContent">' + '<p>' +
                    y.data.result.places[1].description + '</p>' +
                    '</div>' +
                    '</div>';
                let point1 = y.data.result.places[1].point;
                let infowindow1 = new google.maps.InfoWindow({
                    content: content1
                });
                let marker1 = new google.maps.Marker({
                    position: point1,
                    map: map,
                });
                marker1.addListener(
                    'click',
                    function () {
                        infowindow1.open(map, marker1);
                    }
                );

                let content2 =
                    '<div id="content">' + '<div id="siteNotice">' +
                    '</div>' + y.data.result.places[2].name +
                    '<div id="bodyContent">' + '<p>' +
                    y.data.result.places[2].description + '</p>' +
                    '</div>' +
                    '</div>';
                let point2 = y.data.result.places[2].point;
                let infowindow2 = new google.maps.InfoWindow({
                    content: content2
                });
                let marker2 = new google.maps.Marker({
                    position: point2,
                    map: map,
                });
                marker2.addListener(
                    'click',
                    function () {
                        infowindow2.open(map, marker2);
                    }
                );

                let content3 =
                    '<div id="content">' + '<div id="siteNotice">' +
                    '</div>' + y.data.result.places[3].name +
                    '<div id="bodyContent">' + '<p>' +
                    y.data.result.places[3].description + '</p>' +
                    '</div>' +
                    '</div>';
                let point3 = y.data.result.places[3].point;
                let infowindow3 = new google.maps.InfoWindow({
                    content: content3
                });
                let marker3 = new google.maps.Marker({
                    position: point3,
                    map: map,
                });
                marker3.addListener(
                    'click',
                    function () {
                        infowindow3.open(map, marker3);
                    }
                );
            });
        }
        getPoints();
    }
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

            //read the current user number 

            //delete the user number 

            //add 1 to the user number and store it back in public 

        });
    } catch (error) {
        $(`#message`).append("Username already taken.");
    };
}

const loadPage = function () {
    $('.create_button').on("click", createAccount);
    $('.login_button').on("click", login);
    $('.profile_button').on("click", function () {
        window.location.href = "login.html?jwt=" + jwt;
    });
    $('.quiz_link').on("click", function () {
        window.location.href = "quiz.html?jwt=" + jwt;
    });
    $('.map').on("click", function () {
        window.location.href = "map.html?jwt=" + jwt;
    });
    $('.index_button').on("click", function () {
        window.location.href = "index.html?jwt=" + jwt;
    });

    if (document.querySelectorAll('#map').length > 0) {
        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyC3aifUfdZHFzieQOo96mftM4hGZ3E8BpM';
        document.getElementsByTagName('body')[0].appendChild(js_file);
    }

    //get the updated ranks and display 
    /*if (jwt != "undefined") {
        async function displayRanks() {
            await axios({
                method: 'get',
                url: 'http://localhost:3000/private/locations',
            }).then(x => {
                x.data.result

            });
        }
        displayRanks();
    }*/
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