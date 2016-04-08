/**
 * Created by FrankyR on 3/2/2016.
 */

// guessingGame constructor function
guessingGame = function () {
    this.init();
};

// guessingGame prototype where properties and methods are declared
guessingGame.prototype = {
    minNumber: 1,
    maxNumber: 100,
    secretNumber: null,
    message: null,
    totalGuesses: 0, //TODO: Add feature to keep track of the amount guesses user has taken

    init: function () {
        this.generateNumber();
    },

    // generates the secretNumber
    generateNumber: function () {
        this.secretNumber = Math.floor(this.minNumber + (Math.random() * this.maxNumber));
    },

    // Animation method for the up arrow
    arrowUpAnimation: function (arrowElem) {
        var arrowAnimation = setInterval(function () {
            arrowElem.fadeIn("fast").animate({top: '-=80px'}, 250).animate({top: '+=80px'}, 250);
        }, 100);
        setTimeout(function () {
            clearInterval(arrowAnimation);
            arrowElem.fadeOut();
        }, 300);
    },

    // Animation method for the down arrow
    arrowDwnAnimation: function(arrowElem) {
        var arrowAnimation = setInterval(function () {
            arrowElem.fadeIn("fast").animate({top: '+=80px'}, 250).animate({top: '-=80px'}, 250);
        }, 100);
        setTimeout(function () {
            clearInterval(arrowAnimation);
            arrowElem.fadeOut();
        }, 300);
    },

    // Animation method for changing the background color based on user guess
    hotOrColdBgAnimation: function (theGuess, bg) {
        var absoluteDiff = Math.abs(this.secretNumber - theGuess);
        if (this.secretNumber === theGuess) {
            bg.addClass('background-win');
            setTimeout(function () {
                bg.removeClass('background-win', 500, 'ease');
            }, 1000);
        }
        else if (absoluteDiff < 6) {
            bg.addClass('background-smokin-hot');
            setTimeout(function () {
                bg.removeClass('background-smokin-hot', 500, 'ease');
            }, 1000);
        }
        else if (absoluteDiff > 5 && absoluteDiff < 26) {
            bg.addClass('background-hot');
            setTimeout(function () {
                bg.removeClass('background-hot', 500, 'ease');
            }, 1000);
        }
        else if (absoluteDiff > 25 && absoluteDiff < 51) {
            bg.addClass('background-getting-warmer');
            setTimeout(function () {
                bg.removeClass('background-getting-warmer', 500, 'ease');
            }, 1000);
        }
        else if (absoluteDiff > 50 && absoluteDiff < 76) {
            bg.addClass('background-cold');
            setTimeout(function () {
                bg.removeClass('background-cold', 500, 'ease');
            }, 1000);
        }
        else if (absoluteDiff > 75 && absoluteDiff < 101) {
            bg.addClass('background-ice-cold');
            setTimeout(function () {
                bg.removeClass('background-ice-cold', 500, 'ease');
            }, 1000);
        }
    },

    // Check win condition, controls which animation will be triggered
    checkWin: function (theGuess) {
        var $background = $('.background');
        if (theGuess < this.secretNumber) {
            this.hotOrColdBgAnimation(theGuess, $background);
            var $arrowUp = $('#arrow-up');
            this.arrowUpAnimation($arrowUp);
            this.message = theGuess + " is too low, try again!";
            return false;
        }
        else if (theGuess > this.secretNumber) {
            this.hotOrColdBgAnimation(theGuess, $background);
            var $arrowDown = $('#arrow-down');
            this.arrowDwnAnimation($arrowDown);
            this.message = theGuess + " is too high, try again!";
            return false;
        }
        else {
            this.message = "Congratulations, " + theGuess + " is Correct!";
            this.hotOrColdBgAnimation(theGuess, $background);
            return true;
        }
    },

    // Grabs user guess from input and checks if the guess is a number
    makeGuess: function () {
        var guessString = $('#guess_input').val();
        if (guessString && !isNaN(guessString) && guessString <= 100) {
            var guessInteger = parseInt(guessString);
            guessResult = game.checkWin(guessInteger);
            $('#response_div').text(game.message).slideToggle("slow", "swing").delay(1000).fadeToggle("slow");
        }
        else {
            $('#response_div').text("Please enter a number between o and 100!").fadeToggle("slow").delay(1000).fadeToggle("slow");
        }
    },

    //Resets the game
    resetGame: function() {
        this.secretNumber = null;
        this.init();
        $('#response_div').text("Number Reset!").fadeToggle("slow").delay(1000).fadeToggle("slow");
    }
};

var game = new guessingGame;
var guessResult = false;

$(document).ready(function () {

    //Sets arrows to display none
    $('#arrow-up, #arrow-down').hide();

    // Click handler for the guess button
    $('#submitAnswer').click(function () {
        game.makeGuess();
        $('#guess_input').val('');
    });

    // Click handler for the reset game button
    $('#reset').click(function(){
        game.resetGame();
    });
});



