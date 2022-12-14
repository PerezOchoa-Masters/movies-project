"use strict";

$(function() {

    fetch("https://bright-military-blizzard.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data));

    //Update Movies and HTML
    function renderMovies(){
        // setTimeout(() => {    //simulate slow page load
            fetch("https://bright-military-blizzard.glitch.me/movies")
                .then(resp => resp.json())
                .then(function (data) {
                    $(".loader").hide();
                    $("#movies").html(''); //clear current html
                    for(let i = 0; i < data.length; i++){
                        let row = '<div class="col">' +
                                        '<div class="card bg-transparent text-black" style="width: 18rem;">' +
                                            '<img src="img/ticket-303706__340.webp" class="card-img" alt="ticket">' +
                                            '<div class="card-img-overlay" style="padding-top: 0px; padding-left: 35px; padding-right: 24px;">' +
                                                '<div class="d-grid d-md-flex justify-content-md-end">' +
                                                    '<button type="button" data-id="' + data[i].id + '" class="delete btn-close" aria-label="Close"></button>' +
                                                '</div>' +
                                                '<h5 class="card-title" style="margin: auto">' + data[i].id + ') ' + data[i].title + '</h5>' +
                                                '<p class="card-text" style="margin: auto"><strong>Rating: </strong>' + data[i].rating + '/5</p>' +
                                                '<p class="card-text" style="margin: auto"><strong>Genre: </strong>' + data[i].genre + '</p>' +

                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                        $('#movies').append(row);
                    }
                    $(".delete").click(function () {
                        let id = $(this).data("id")
                        console.log(id)
                        deleteMovie(id)
                    });
                });
        // },3000);    //close of load simulation
    };

    // Add Movies
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

    //Delete Movies
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

    //Edit Movies
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

});
