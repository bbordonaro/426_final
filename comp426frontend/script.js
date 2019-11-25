var jwt = getUrlVars().jwt;
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2
    });
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

    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": data.name,
                "pass": data.password,
            }
        }).then(x => {
            $('#message').append("Account successfully created.");
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