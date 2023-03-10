
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = true;
var gamePattern = [];


var userClickedPattern = [];

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); 
   checkAnswer(userClickedPattern.length-1); 
  playSound(userChosenColour);
  animatePress(userChosenColour);
});



function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}




$(document).keypress(function() {
   

  if (started) {
    
    $("h1").text("Level " + level);
  nextSequence();
  started = false;
  }

});


function nextSequence() {

  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

 }


function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    userClickedPattern = [];

  }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = true;
}
 
