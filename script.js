var jwt = getUrlVars().jwt;

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
                "pass": data.password
            }

        });
    } catch (error) {
        $(`#message`).append("Username already taken.")
    }

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