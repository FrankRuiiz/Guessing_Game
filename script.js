/**
 * Created by FrankyR on 3/2/2016.
 */

guessingGame = function (min, max) {
    this.init(min, max);
};

guessingGame.prototype = {
    minNumber: 1,
    maxNumber: 100,
    secretNumber: null,
    message: null,
    totalGuesses: 0,

    init: function () {
        this.generateNumber();
    },

    generateNumber: function () {
        this.secretNumber = Math.floor(this.minNumber + (Math.random() * this.maxNumber));
    },
    arrowAnimation: function (arrowElem) {
        var arrowAnimation = setInterval(function () {
            arrowElem.animate({top: '-=80px'}, 300);
            arrowElem.animate({top: '+=80px'}, 300);
        }, 600);
        setTimeout(function () {
            clearInterval(arrowAnimation);
        }, 1500);
    },
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
        else {
            alert("Must be a number between 1 and 100!")
        }
    },
    checkWin: function (theGuess) {
        var $background = $('.background');
        if (theGuess < this.secretNumber) {
            this.hotOrColdBgAnimation(theGuess, $background);
            var $arrowUp = $('#arrow-up');
            this.arrowAnimation($arrowUp);
            this.message = theGuess + " is too low, try again!";
            return false;
        }
        else if (theGuess > this.secretNumber) {
            this.hotOrColdBgAnimation(theGuess, $background);
            var $arrowDown = $('#arrow-down');
            this.arrowAnimation($arrowDown);
            this.message = theGuess + " is too high, try again!";
            return false;
        }
        else {
            this.message = "Congratulations, " + theGuess + " is Correct!";
            this.hotOrColdBgAnimation(theGuess, $background);
            return true;
        }
    },
    makeGuess: function () {
        var guessString = $('#guess_input').val();
        if (guessString && !isNaN(guessString)) {
            var guessInteger = parseInt(guessString);
            guessResult = game.checkWin(guessInteger);
            $('#response_div').text(game.message);
        }
        else {
            $('#response_div').text("Please enter a number between 1 and 100!");
        }
    }
};

var game = new guessingGame;
var guessResult = false;

$(document).ready(function () {
    $('#submitAnswer').click(function () {
        game.makeGuess();
        $('#guess_input').val('');
    });
});



