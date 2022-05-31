var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userCLickedPattern =[];
var started = 0;
var level = 0;

$(document).keypress(function(){
  if(started == 0){

    nextSequence()
  }
  started = 1;
});

$('.btn').click(function (){
  var userChosenColour = $(this).attr('id');
  userCLickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userCLickedPattern);
  checkAnswer(userCLickedPattern.length-1);
});

function nextSequence(){

  userCLickedPattern =[];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $('h1').text('Level ' + level);
  level++;

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed');
  setTimeout(function() {
    $('#'+currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel){
  if(userCLickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(currentLevel === level - 1 ){
      setTimeout(nextSequence,1000);
    }
  }else{
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function (){
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver(){
  level = 0;
  started = 0;
  gamePattern = [];
}
