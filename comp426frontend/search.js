var jwt = getUrlVars().jwt;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

var location_list = [
    "Home",
    "Map",
    "Quiz",
    "Maldives",
    "Kaua'i, Hawaii, U.S.A",
    "Port Douglas, Australia",
    "Moab, Utah, U.S.A.",
    "Patagonia, South America",
    "Iceland",
    "Greece",
    "Petra, Jordan",
    "Machu Picchu, Peru",
    "London, England",
    "Tuscany, Italy",
    "Delhi, India"
];

const handleSearchSubmit = function() {
    let place = $("#search")[0].value;
    window.location.href = "search.html?jwt=" + jwt;
};

function ac(value) {
    document.getElementById('datalist').innerHTML = '';

    var l = value.length;
    for (var i = 0; i < location_list.length; i++) {
        if (((location_list[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {

            var node = document.createElement("option");
            var val = document.createTextNode(location_list[i]);
            node.appendChild(val);

            document.getElementById("datalist").appendChild(node);
        }
    }
}

$(function () {
    $("#search")[0].value = "";
    $("#search_button").on("click", handleSearchSubmit);

});
