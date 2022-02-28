buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  MakeSound(userChosenColour);
  animatePress("#" + userChosenColour);
  checkPattern(userClickedPattern.length-1);
});

function checkPattern(trigger) {
  if (userClickedPattern[trigger] === gamePattern[trigger]) {
      if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over. Press any key to restart.");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  MakeSound(randomChosenColour);
}

function MakeSound(trigger) {
  var audio = new Audio("sounds/"+ trigger + ".mp3");
  audio.play();
}

function animatePress(trigger) {
  $(trigger).addClass("pressed");

  setTimeout(function() {
    $(trigger).removeClass("pressed");
  }, 100);
}
// ******using javascript for addEventListener*******

// for (var i = 0; i < 4; i++) {
//   document.querySelectorAll(".btn")[i].addEventListener("click",
//     function() {
//       var buttonID = this.id;
//       MakeSound(buttonID);
//       $(this).fadeOut(100).fadeIn(100) ;
//         }
//   );
// }
