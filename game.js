$(document).ready(function(){
  
  const buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];

  let level = 0;
  let started = false;

  $(document).keydown(function() {
    if (!started) {
      $("h1").html("Level 0")
      nextSequence();
      started = true;
    }
  });

  document.addEventListener("touchstart", function() {
    if (!started) {
      $("h1").html("Level 0")
      nextSequence();
      started = true;
    }
  });

  function nextSequence() {                                       
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
    level++;
    $("h1").html("Level " + level);
  }
  
  $(".btn").click(function() {
    let userChosenColour = (this.id);              
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function playSound(name) {
    let randomColourSound = new Audio ("./sounds/" + name + ".mp3");
    randomColourSound.play();
  }

  function checkAnswer(indexNumber) {
    if (gamePattern[indexNumber] == userClickedPattern[indexNumber]) {
      if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function(){
          nextSequence();
          }, 1000);
        }    
    } else if (started == true && gamePattern[indexNumber] !== userClickedPattern[indexNumber]) {
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      started = false;
      let gameOverSound = new Audio ("./sounds/wrong.mp3");
      gameOverSound.play();
      $("h1").html("Game Over - Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
    }
  }
});

