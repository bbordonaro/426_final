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
    };

    function debounce(func, wait, immediate) {
        var timeout;
      
        return function executedFunction() {
          var context = this;
          var args = arguments;
              
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
      
          var callNow = immediate && !timeout;
          
          clearTimeout(timeout);
      
          timeout = setTimeout(later, wait);
          
          if (callNow) func.apply(context, args);
        };
      };
});
