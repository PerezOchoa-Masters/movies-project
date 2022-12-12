"use strict";
$(function() { //IIFE open

    fetch("https://bright-military-blizzard.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data));

    /////////////////Loading Screen////////////////
    //
    //
    //////////////////////////////////////////////
    renderMovies();

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
        renderMovies();
    });

    //Adding movies list to HTML

    function renderMovies(){
        fetch("https://bright-military-blizzard.glitch.me/movies")
            .then(resp => resp.json())
            .then(function(data) {
                $("#movies").html('');
                for (let i=0; i<data.length; i++) {
                    let row = '<div class="row row-cols-2">' +
                                    '<div class="col">' + '<strong>' + data[i].title+ '</strong>' + '</div>' +
                                    '<div class="col">' + data[i].rating + '</div>' +
                                    '<div class="col">' + data[i].genre + '</div>' +
                                    '<button type="button" data-id="' + data[i].id +'" class="delete btn-close" aria-label="Close"></button>' +
                                '</div><br>';
                    $('#movies').append(row);
                };
                $(".delete").click(function (){
                   let id = $(this).data("id")
                   console.log(id)
                    deleteMovie(id)
                });
            });
    };


    // DELETE MOVIE
    function deleteMovie(id){
        let fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`https://bright-military-blizzard.glitch.me/movies/${id}`, fetchOptions)
            .then((resp) => console.log("Deleted " + id, resp ))
        renderMovies()
    }


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


}); //IIFE close
