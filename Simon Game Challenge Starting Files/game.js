var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
    if (!started) {
        console.log("Keypress");
        $("h1").text("Level " + 1);
        setTimeout(nextSequence, 1000);
    }
});

function nextSequence() {
    started = true;
    $("h1").text("Level " + ++level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateButton(randomChosenColor);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

$(".btn").click(function () {
    if (started) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animateButton(userChosenColor);
        playSound(userChosenColor);
        console.log(userClickedPattern);
        if (userClickedPattern.length === level) {
            setTimeout(checkAnswer, 1000);
        }
    }
});

function animateButton(randomChosenColor) {
    console.log("working");
    $("#" + randomChosenColor).addClass("animate");
    setTimeout(function () {
        $("#" + randomChosenColor).removeClass("animate");
    }, 50);
}

function playSound(randomChosenColor) {
    var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

function checkAnswer() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            $("h1").text("Game Over");
            $("body").addClass("game-over");
            new Audio("./sounds/wrong.mp3").play();
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 500);
            $("h1").text("Game Over, Press Any Key to Restart The Game");
            started = false;
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            return;
        }
    }
    userClickedPattern = [];
    setTimeout(nextSequence, 100);
}

function gameOver() {

}