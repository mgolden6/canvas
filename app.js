//jshint esversion: 6

// start game
function startGame () {
    // f1.0.3_Find_the_Canvas_Element
    let canvas = document.getElementById("myCanvas");

    // f1.0.4_Create_a_Drawing_Object
    let ctx = canvas.getContext("2d");

    // f2.0.1_create_character
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(10, 10, 10, 10);
}