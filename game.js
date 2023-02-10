var arr = [];
var level = 0;
var colors = ["red", "blue", "green", "yellow"];
var ub = [];
var c = 0;

function sound(nc) {
    var aud = new Audio("sounds/" + nc + ".mp3");
    aud.play();
}

function anime(nc) {
    $("#" + nc).addClass("pressed");
    setTimeout(function () {
        $("#" + nc).removeClass("pressed");
    }, 100);
}

var start = false;
$(document).keydown(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nc();
        start = true;
    }
})

function nc() {
    level++;
    $("#level-title").text("Level " + level);
    var n = Math.floor(4 * (Math.random()));

    var nc = colors[n];
    arr.push(nc);

    $("#" + nc).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(nc);
    c = 0;
}

function checkAns(level) {
    var same = true;
    var li = ub.length;
    if (arr[li - 1] != ub[li - 1]) {
        same = false;
    }
    return same;
}

$(".btn").click(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        setTimeout (nc,500);
        start = true;
    }else{
    anime($(this).attr("id"));
    ub.push($(this).attr("id"));
    sound($(this).attr("id"));
    c++;
    console.log(arr);
    console.log(ub);
    if (checkAns(level)) {
        if (c == level) {
            setTimeout(nc, 1000);
            ub = [];
        }
    } else {
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        Restart();
    }}
});

function Restart() {
    arr = [];
    level = 0;
    ub = [];
    c = 0;
    start=false;
}