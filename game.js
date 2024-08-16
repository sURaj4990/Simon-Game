var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").html("level " + level);
    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userChosenColor);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

var started = false;


$(document).keydown(function () {
    if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            console.log("Completed sequence!");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        startOver();
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart");
    }

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
