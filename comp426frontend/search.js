var location_list = [
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
    console.log("YOOOOO!");
};

$(function () {
    var n = location_list.length; 

    function ac(value) {
        document.getElementById('datalist').innerHTML = '';

        var l = value.length;
        for (var i = 0; i < n; i++) {
            if (((tags[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {

                var node = document.createElement("option");
                var val = document.createTextNode(tags[i]);
                node.appendChild(val);

                document.getElementById("datalist").appendChild(node);
            }
        }
    }

      $("#search_button").on("click", handleSearchSubmit);
});
