"use strict";
$(function() { //IIFE open

    /////////////////Loading Screen////////////////
    $(window).load(function() {      //Do this when the window has loaded
        $(".loader").fadeOut("slow");  //Fade out the loader div

        fetch("https://bright-military-blizzard.glitch.me/movies")
            .then(resp => resp.json())
            .then(data => console.log(data));
        renderMovies();
    });



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

    //Update movies list HTML
    function renderMovies(){
        fetch("https://bright-military-blizzard.glitch.me/movies")
            .then(resp => resp.json())
            .then(function(data) {
                $("#movies").html(''); //clear current html
                for (let i=0; i<data.length; i++) {
                    let row = '<div class="row row-cols-2">' +
                                    '<div class="col">' + '<strong>' + data[i].title+ '</strong>' + '</div>' +
                                    '<div class="col">Rating: ' + data[i].rating + '/5</div>' +
                                    '<div class="col">' + data[i].genre + '</div>' +
                                    '<button type="button" data-id="' + data[i].id +'" class="delete btn-close" aria-label="Close"></button>' +
                                '</div><br>';
                                $('#movies').append(row);
                } //for loop close
                $(".delete").click(function (){
                   let id = $(this).data("id")
                   console.log(id)
                    deleteMovie(id)
                });



                // $("#movies").html(''); //clear current html
                // for (let i=0; i<data.length; i++) {
                //     let card =  '<div className="card">' +
                //                     '<img src="..." className="card-img-top" alt="...">' +
                //                     '<div className="card-body">' +
                //                         '<h5 className="card-title"><strong>' + data[i].title + '</strong></h5>' +
                //                         '<p className="card-text">' + data[i].genre + '</p>' +
                //                         '<p className="card-text"><small className="text-muted"> Rating: ' + data[i].rating + '/5</small></p>' +
                //                     '</div>'+
                //                 '</div>'
                //                 $('.card-group').append(card);
                //} //for loop close


            }); //close .then

    }; //close renderMovies


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
        renderMovies();
    };


    // // EDIT MOVIE
    $("#btnEdit").click(function () {
        const editMovie = {
            title: $("#titleEdit").val(),
            rating: $("#ratingEdit").val(),
            genre: $("#genreEdit").val()
        };
        fetch("https://bright-military-blizzard.glitch.me/movies", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMovie),
        }).then(() => fetch("https://bright-military-blizzard.glitch.me/movies"))
            .then(resp => resp.json())
            .then(movies => console.log(movies));
        renderMovies();
    });


}); //IIFE close
