"use strict";
$(function() {

fetch("https://bright-military-blizzard.glitch.me/movies")
    .then(resp => resp.json())
    .then(data => console.log(data));

//Loading Screen

// ADD USER MOVIE (COMPLETED)
$("#btn").click(function () {
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
    }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies"))
        .then(resp => resp.json())
        .then(movies => console.log(movies));

});



//Adding movies list to HTML


    fetch("https://bright-military-blizzard.glitch.me/movies")
        .then(resp => resp.json())
        .then(function(data) {
            for (var i=0; i<data.length; i++) {
                var row = $('<div class="row row-cols-2"><div class="col"><strong>' + data[i].title+ '</strong></div><div class="col">' + data[i].rating + '</div><div class="col">' + data[i].genre + '</div></div><br>');
                $('#movies').append(row);
            };



    // let movieList = [];
    // movies.forEach(({ title, rating, genre }) => {
    //     movieList.push(`${title}, ${rating}, ${genre}`);
    // });
    // let list = '<ul>';
    // for(let movie of movieList) {
    //     list += `<li>${movie}</li>`;
    // }
    // list += '</ul>';


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