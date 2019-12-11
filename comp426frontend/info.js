var jwt = getUrlVars().jwt;
var targetPlace = getUrlVars().place;


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/*const renderLocationInfo = function (place, res_order) {

    let places = results[res_order].places;
    let description = "";
    let img = "";
    for (let i = 1; i < 4; i++) {
        if (places[i].name == place) {
            description = places[i].description;
            img = places[i].img;
        }
    }
    let place_sub = place.substring(0, 3);
    return `<div class="location_card">
                <p class="card_title" id="${place_sub}">${place}</p>
                <p class="card_des" id="${place_sub}_des">${description}</p>
                <img class="card_pic" src="${img}">
           </div>`;
};*/

const renderLocationInfo = function (place) {
    let description = "";
    let img = "";
    for (let x = 0; x < 4; x++) {
        let places = results[x].places;
        for (let i = 1; i < 4; i++) {
            if (places[i].name == place) {
                description = places[i].description;
                img = places[i].img;
            }
        }
    }
    let place_sub = place.substring(0, 3);
    return `<div class="location_card">
                <p class="card_title" id="${place_sub}">${place}</p>
                <p class="card_des" id="${place_sub}_des">${description}</p>
                <img class="card_pic" src="${img}">
           </div>`;
}

$(function () {

    const $root = $('#locations_div');

    /* for (let i = 3; i < location_list.length; i++) {
         let results_location = 0;
         if (i < 6) {
             results_location = 0;
         } else if (i < 9) {
             results_location = 1;
         } else if (i < 12) {
             results_location = 2;
         } else {
             results_location = 3;
         }
         

     }*/
    var temp = renderLocationInfo(targetPlace.replace(/%20/g, " "));
    $root.append(temp);

});