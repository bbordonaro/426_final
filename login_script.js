async function login() {
    const $form = $('#login-form');
    const data = $form.serializeArray().reduce((o, x) => {
            o[x.name] = x.value;
            return o;
        }, {});

    //console.log("result");

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        data: {
            "name": data.name,
            "pass": data.password
        }
    });
    
}

async function createAccount() {
    const $form = $('#create-form');
    const data = $form.serializeArray().reduce((o, x) => {
            o[x.name] = x.value;
            return o;
        }, {});

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/account/create',
        data: {
            "name": data.name,
            "pass": data.password
        }
    });

    result.then(function() {
        console.log("Hello");
    })
}

const loadPage = function () {
    $('.create_button').on("click", createAccount);
    $('.login_button').on("click", login);
}

$(function () {
    loadPage();
});
