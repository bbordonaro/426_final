async function login() {
    event.preventDefault();
    const $form = $('#login-form');
    const data = $form.serializeArray().reduce((o, x) => {
        o[x.name] = x.value;
        return o;
    }, {});
    console.log(data);
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        data: {
            "name": data.name,
            "pass": data.password,
        }
    });
    console.log(result.data);
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
}

const loadPage = function () {
    $('.create_button').on("click", createAccount);
    $('.login_button').on("click", login);

}

$(function () {
    loadPage();
});