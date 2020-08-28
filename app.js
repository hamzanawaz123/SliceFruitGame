$(document).ready(() => {
  let playing = false;
  let score;
  let trialsLeft;
  let step;
  let action;
  let fruits = [
    "apple",
    "banana",
    "cherries",
    "Cucumbers",
    "grapes",
    "mango",
    "orange",
    "peach",
    "pineapple",
    "watermelon",
  ];
  // Click on start/reset button
  $("#startreset").click(() => {
    // Are we playing
    if (playing == true) {
      // Yes --> reload page
      location.reload();
    } else {
      //hide gameOver
      $("#gameOver").hide();
      // No
      playing = true;
      score = 0;
      $("#scoreValue").html(score);
      // Show trials left
      $("#trialsLeft").show();
      // Change button text to reset game
      $("#startreset").html("Reset Game");
      trialsLeft = 3;
      addHearts();
      startAction();
    }
  });
  //Slice a fruit
  $("#fruit1").mouseover(function () {
    score++;
    $("#scoreValue").html(score);
    //play a sound
    $("#sliceSound")[0].play();
    // hide the fruit
    clearInterval(action);
    $("#fruit1").hide("explode", 500);
    // sending new fruit
    setTimeout(startAction, 530);
  });

  //Explode fruit
  //F U N C T I O N S:
  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 1; i <= trialsLeft; i++) {
      $("#trialsLeft").append('<img class="life" src="img/heart.png">');
    }
  }
  function startAction() {
    // 1.Generate a fruit
    $("#fruit1").show();
    chooseFruit(); // choose a random fruit
    // Define a random step
    step = 1 + Math.random(5 * Math.random());
    // 2.Move fruit down by 10 msec
    action = setInterval(() => {
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      // If the fruit is too low?
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        if (trialsLeft > 1) {
          // 1.Generate a random fruit
          $("#fruit1").show();
          chooseFruit(); // choose a random fruit
          // Define a random step
          step = 1 + Math.random(5 * Math.random());
          trialsLeft--;
          //populate trials left box
          addHearts();
        } else {
          // Game Over
          playing = false; // now we are not playing
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over</p> <p> Your Score is" + " " + score + "</p>"
          );
          stopAction();
          $("#trialsLeft").hide();
        }
      }
    }, 10);
  }
  // generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "img/" + fruits[Math.round(9 * Math.random())] + ".png"
    );
    $("#fruit1").css({ left: Math.round(500 * Math.random()), top: -50 });
  }
  // stop dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
