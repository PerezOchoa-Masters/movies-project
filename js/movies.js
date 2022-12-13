"use strict";

$(function() { //IIFE open

    fetch("https://bright-military-blizzard.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data));


    //Update movies list HTML
    function renderMovies(){
        // setTimeout(() => {    //simulate slow page load
            fetch("https://bright-military-blizzard.glitch.me/movies")
                .then(resp => resp.json())
                .then(function (data) {
                    $(".loader").hide();
                    $("#movies").html(''); //clear current html
                    for(let i = 0; i < data.length; i++){
                        let row = '<div class="row row-cols-5">' +
                            '<div class="col">' + data[i].id + ')</div>' +
                            '<div class="col">' + '<strong>' + data[i].title + '</strong>' + '</div>' +
                            '<div class="col">Rating: ' + data[i].rating + '/5</div>' +
                            '<div class="col">' + data[i].genre + '</div>' +
                            '<button type="button" data-id="' + data[i].id + '" class="delete btn-close" aria-label="Close"></button>' +
                            '</div><br>';
                        $('#movies').append(row);
                    } //for loop close
                    $(".delete").click(function () {
                        let id = $(this).data("id")
                        console.log(id)
                        deleteMovie(id)
                    });
                }); //close .then
        // },3000);    //close of load simulation
    }; //close renderMovies


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
            .then(movies => {
                console.log(movies)
                renderMovies()});

    });

    // DELETE MOVIE (needs reload)
    function deleteMovie(id){
        let fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`https://bright-military-blizzard.glitch.me/movies/${id}`, fetchOptions)
            .then((resp) => {
                console.log("Deleted " + id, resp )
                renderMovies();
            })
    };


    // // EDIT MOVIE
    $("#btnEdit").click(function () {
        const editid = $("#idedit").val()

        console.log(editid)
        const editMovie = {
            title: $("#titleEdit").val(),
            rating: $("#ratingEdit").val(),
            genre: $("#genreEdit").val()
        };

        fetch(`https://bright-military-blizzard.glitch.me/movies/${editid}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies"))
            .then(resp => resp.json())
            .then(movies => {
                console.log(movies)
                renderMovies();
            });
    });

    renderMovies();

}); //IIFE close
