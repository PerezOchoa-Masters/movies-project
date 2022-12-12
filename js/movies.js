"use strict";
$(function() {

fetch("https://bright-military-blizzard.glitch.me/movies")
    .then(resp => resp.json())
    .then(data => console.log(data));

// ADD USER MOVIE
$("#btn").click(function (e) {
    e.preventDefault();
    const newMovie = {
        title: $("#title").val(),
        rating: $("#rating").val(),
        genre: $("#genre").val()
    };
    fetch("https://bright-military-blizzard.glitch.me/movies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));
});

    // let movieList = [];
    // movies.forEach(({ title, rating, genre }) => {
    //     movieList.push(`${title}, ${rating}, ${genre}`);
    // });
    // let list = '<ul>';
    // for(let movie of movieList) {
    //     list += `<li>${movie}</li>`;
    // }
    // list += '</ul>';

$("#movies").html(function (){
    fetch("https://bright-military-blizzard.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data));

    //document.getElementById("movies").innerHTML = list;

});


// // EDIT MOVIE
// const editMovie = {
//     title: "Be Kind Rewind",
//     director: "Michael Gondry",
//     release_date: 2008,
//     cast: ["Yasiin Bey", "Jack Black", "Danny Glover"]
// };
// fetch("https://bright-military-blizzard.glitch.me/movies/{INSERT-USER-INPUT-HERE}", {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newMovie),
// }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));


// DELETE MOVIE
// fetch("https://bright-military-blizzard.glitch.me/movies/5", {
//     method: "DELETE"
// }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

});