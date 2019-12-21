//jshint esversion: 6

// start game
function startGame () {
    // f1.0.3_Find_the_Canvas_Element
    let canvas = document.getElementById("myCanvas");

    // f1.0.4_Create_a_Drawing_Object
    let ctx = canvas.getContext("2d");

    // f1.0.5_Draw_on_the_Canvas
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 400, 400);

    // test with log
    return("getting somewhere");
}