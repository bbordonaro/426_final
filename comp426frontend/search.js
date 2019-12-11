// make submit different for each location, home, quiz, map, etc.

// map needs to be only visible by logged in users - is quiz taken needed?

const handleSearchSubmit = function () {

    if (place == "Home") {
        window.location.href = "index.html?jwt=" + jwt;
    } else if (place == "Map") {
        window.location.href = "map.html?jwt=" + jwt;
    } else if (place == "Quiz") {
        window.location.href = "quiz.html?jwt=" + jwt;
    } else {
        window.location.href = "search.html?jwt=" + jwt + "&place=" + place;
    }
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