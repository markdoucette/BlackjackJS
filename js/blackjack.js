"use strict"
/**
 * Blackjack engine written in Javascript. 
 */

/**************************************
 * Card object
 * @param suit - the suit as a value of 1 to 4
 * @param num - the number of the card between 1 and 13
 *************************************/
function Card(suit, num) {
    // constants
    var JACK = 11;
    var QUEEN = 12;
    var KING = 13;
    var ACE = 1;
    var FACE_VAL = 10; // 10 points for a face card

    // data members
    var mSuit = suit; // private var representing the card suit as an int
    var mNum = num; // private var representing the number 1-13 of the card
    var mNumString; // private var representing the number string of the card A - 10, J, Q, K

    // public getters
    this.getSuit = function() {
        return mSuit;
    };
    
    /**
     * Return a Suit name as a string
     */
    this.getSuitString = function() {
         var suitString;
        switch(mSuit) {
            case 1: 
               suitString = "Hearts";
                break;
            case 2:
                suitString = "Diamonds";
                break;
            case 3:
                suitString = "Clubs";
                break;
            case 4:
                suitString = "Spades";
                break;
            default:
                suitString = "";
        }
        
        return suitString;
    };
    
    this.getNum = function() {
        return mNum;
    };
    
    this.getNumString = function() {
        switch(mNum) {
            case 1:
                mNumString = "Ace";
                break;
            case 11:
                mNumString = "Jack";
                break;
            case 12:
                mNumString = "Queen";
                break;
            case 13:
                mNumString = "King";
                break;
            default:
                mNumString = "" + mNum;
        }        
        
        return mNumString;
    };

    /**
     * Since card number is between 1 and 13 (13 cards per suit)
     * we have to determine if the card is an Jack, Queen, King, or Ace and
     * return the actual point value of the card number
     */
    this.cardValue = function() {
        if (mNum >= JACK && mNum <= KING) {
            return FACE_VAL;
        } else if (mNum === ACE) {
           return 11; // TODO: account for Ace = 1 or Ace = 11;
        } else {
            return mNum; // no face card so return actual number as value
        }
    };
    
    this.toString = function() {
         return this.getNumString() + " of " + this.getSuitString();   
    };
}

/**
 * Deck Object - Representation of a deck of 52 cards
 */
function Deck() { 
    var deckCards = []; // array of 52 Cards;  
    
    // populate the deck with 52 unique cards 
    for (var i = 1; i <= 4; ++i) { // suits
       for (var j = 1; j <= 13; ++j) { // numbers
           deckCards.push(new Card(i, j));
       } 
    }
    
    /**
     * @return the array of 52 cards
     */
    this.getDeckCards = function() {
        return deckCards;  
    };
    
    /**
     * Shuffle the deck using Fisher-Yates algorithm
     */
    this.shuffle = function() {
        var temp; // temporary holder of reference to current card
        var randCard;
        for(var i = deckCards.length - 1; i > 0; --i) {
            temp = deckCards[i]; // store current card 
            randCard = Math.floor(Math.random() * i); 
            deckCards[i] = deckCards[randCard];
            deckCards[randCard] = temp;
        }   
    };
    
    /**
     * Deal a card
     */
    this.deal = function() {
    // give a new card back
        if (deckCards.length > 0) {
            return deckCards.pop(); // take a card
        } else {
            return null;
        }
    };
    
    /**
     * Display the deck in the console for debug
     */
    this.toString = function() {
        for (var i = 0; i < deckCards.length; ++i) {
            console.log("Suit: " + deckCards[i].getSuit()
                       + ", Number: " + deckCards[i].getNum());
        }  
    };
}

/**************************************
 * Hand object - Representation of a 
 * players hand of n cards
 *************************************/
function Hand() {
    var cards = []; // array of players cards

    /**
     * Add a card to the hand
     */
    this.hit = function(card) {
        cards.push(card);         
    };
    
    /**
     * @return the array of players cards
     */
    this.getCards = function() {
        return cards;
    };
    
    /**
     * Calculate the score of the hand
     */
    this.score = function() {
        var total = 0;
        var acecount = 0;
        for (var i = 0; i < cards.length; ++i) {
            var val = cards[i].cardValue();
            if (val === 11) {
              ++acecount;
            } 
            total += cards[i].cardValue();
        }
        
        while (acecount > 0) {
         if (total > 21) {
            total -= 10;
            --acecount;
         } else {
            return total;   
         }
        }
        
        return total;
    };
    
    /**
     * Display the deck in the console for debug
     */
    this.toString = function() {
        // for now return a string
        var msg = "";
        for (var i = 0; i < cards.length; ++i) {
            msg += cards[i].toString() + "<br />";
        }  
        
        return msg;
    };
}

/**************************************
 * Game runner
 * @author Mark Doucette
 *************************************/
var startBtn = $("#start-btn");
var hitBtn = $("#hit-btn");
var standBtn = $("#stand-btn");
var playAgainBtn = $("#play-again");
playAgainBtn.hide();

var deck;
var playerHand;
var dealerHand;
var isPlaying = false;

/**
 * Set the game buttons state
 */
function setGameBtnState(isReadyState) {
   // if we are in ready state then only the Start button is enabled
    if (isReadyState) {
      hitBtn.attr("disabled", "disabled");  
      standBtn.attr("disabled", "disabled");  
    } else {
      startBtn.attr("disabled", "disabled");
      hitBtn.removeAttr("disabled");  
      standBtn.removeAttr("disabled");  
    }
}

/**
 * Initialize the blackjack game
 */
function playBlackJack() {
    isPlaying = true; 
        // disable the start button, enable hit and stand
        setGameBtnState(false);
        deck = new Deck();
        deck.shuffle();
        playerHand = new Hand();
        playerHand.hit(deck.deal());
        playerHand.hit(deck.deal());
        dealerHand = new Hand();
        dealerHand.hit(deck.deal());
        dealerHand.hit(deck.deal());
    
        // show player hand
        $("#player-cards").html(playerHand.toString());
        if (playerHand.score() === 21) { // dealt a 2 card blackjack
            endBlackJack();
        }
        
        
        hitBtn.click(function(){
            if (isPlaying) {
                playerHand.hit(deck.deal());
                $("#player-cards").html(playerHand.toString());
                if (playerHand.score() >= 21) {
                    endBlackJack();
                    return;
                }
            }
        });
    
        standBtn.click(function() {
            endBlackJack();
        });
    
        playAgainBtn.click(function() {
            playAgain();
        });

};

/**
 * Calculate who won and return an appropriate string
 */
var declareWinner = function(userHand, dealerHand) {
    var userScore = userHand.score();
    var dealerScore = dealerHand.score();
    
     if ( userScore === 21) {
         return "Blackjack! You win!!!";
     }
     else if (userScore > 21) {
        if (dealerScore > 21) {
            return "You tied!";
        } else {
            return "You lose!";
        }
    } else if (dealerScore > 21) {
        return "You win!";
    } else if (userScore > dealerScore) {
        return "You win!";
    } else if (userScore === dealerScore) {
        return "You tied!";
    } else {
        return "You lose!";   
    }
};

/**
 * End the blackjack game
 */
function endBlackJack() {
    $("#player-cards").html(playerHand.toString());
    while (dealerHand.score() < 17) {
        dealerHand.hit(deck.deal());  
    }
    
    $("#dealer-cards").html(dealerHand.toString());
    isPlaying = false;
    var endMsg = declareWinner(playerHand, dealerHand);
    $("#outcome").html(endMsg);
    setGameBtnState(true);
    $("#play-again").toggle(1000);
}

/**
 * Play again - using reload
 */
function playAgain() {
    location.reload(true) //force reload
}

////////// Click events /////////
$(window).load(setGameBtnState(true));
startBtn.click(playBlackJack);


















