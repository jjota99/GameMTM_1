const prepGame = {
  difficulty: null,
  operation: null,

  selectDifficulty(event) {
    const eventValue = event.target.value;
    prepGame.difficulty = null;
    if (eventValue !== "0") {
      prepGame.difficulty = eventValue;
    }
  },

  selectOperation(event) {
    const eventValue = event.target.value;
    prepGame.operation = null;
    const signal = document.getElementById("signal");
    if (eventValue === "0") {
      signal.innerHTML = "≫";
    } else {
      signal.innerHTML = eventValue;
      prepGame.operation = eventValue;
    }
  },
};

const startGame = {
  gameStarted: null,
  init() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("hits").innerHTML = "Hits ≫ 0";
    document.getElementById("errors").innerHTML = "Errors ≫ 0";
    document.getElementById("time").innerHTML = "Time ≫ 45s";
    document.getElementById("start").disabled = true;
    if (!prepGame.difficulty || !prepGame.operation) {
      alert("Select difficulty and operation");
      return;
    } else {
      startGame.gameStarted = true;
      startGame.raffle();
      gameTimer.counter = setInterval(function () {
        gameTimer.timer();
      }, 1000);
    }
  },
  raffle() {
    const numbers = startGame.numbersRaffle();
    const camp1 = document.getElementById("input1");
    const camp2 = document.getElementById("input2");
    if (prepGame.operation !== "null") {
      const firstCamp = Math.round(Math.random() * numbers);
      const secondCamp = Math.round(Math.random() * numbers);
      camp1.value = firstCamp;
      camp2.value = secondCamp;
    }
  },

  numbersRaffle() {
    const difficulty = document.getElementById("difficulty").value;
    const operation = document.getElementById("signal").innerHTML;
    let multRandom = 0;

    if (difficulty == "e" && operation == "*") {
      multRandom = 5;
    } else if (difficulty == "m" && operation == "*") {
      multRandom = 10;
    } else if (difficulty == "h" && operation == "*") {
      multRandom = 15;
    } else if (difficulty == "e") {
      multRandom = 15;
    } else if (difficulty == "m") {
      multRandom = 50;
    } else if (difficulty == "h") {
      multRandom = 100;
    }
    return multRandom;
  },
};

const analyzeData = {
  hits: 0,
  errors: 0,
  analyzeResponse(event) {
    const camp3 = document.getElementById("input3").value;
    const camp3Int = parseInt(camp3);

    if (camp3 === "" || isNaN(camp3Int) || event.keyCode !== 13) {
      return;
    }

    const camp1 = document.getElementById("input1").value;
    const camp2 = document.getElementById("input2").value;
    const hits = document.getElementById("hits");
    const errors = document.getElementById("errors");
    const result = eval(camp1 + prepGame.operation + camp2);

    if (camp3Int === result) {
      analyzeData.hits++;
      document.getElementById("input3").value = "";
      startGame.raffle();
    } else if (camp3Int !== result) {
      analyzeData.errors++;
      document.getElementById("input3").value = "";
    } else {
    }
    hits.innerHTML = "Hits ≫ " + analyzeData.hits;
    errors.innerHTML = "Errors ≫ " + analyzeData.errors;
  },
};

const gameTimer = {
  seconds: 44,
  counter: null,
  timer() {
    if (gameTimer.seconds === -1) {
      clearInterval(gameTimer.counter);
      alert("Game over, time is out!");
    } else {
      document.getElementById("time").innerHTML =
        "Time ≫ " + gameTimer.seconds + "s";
      gameTimer.seconds--;
    }
  },
};

const resetGame = {
  reset() {
    document.getElementById("difficulty").value = 0;
    document.getElementById("operation").value = 0;
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("hits").innerHTML = "Hits ≫ 0";
    document.getElementById("errors").innerHTML = "Errors ≫ 0";
    document.getElementById("start").disabled = false;
    analyzeData.hits = 0;
    analyzeData.errors = 0;
    if (gameTimer.counter !== 0) {
      gameTimer.seconds = 45;
      clearInterval(gameTimer.counter);
      document.getElementById("time").innerHTML =
        "Time ≫ " + gameTimer.seconds + "s";
    }
  },
};
