/**
 * Blackjack engine written in Javascript. 
 */

/**************************************
 * Game runner
 * @author Mark Doucette
 *************************************/



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

    // public getters
    this.getSuit = function() {
        return mSuit;
    };
    
    this.getNum = function() {
        return mNum;
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
}

/**************************************
 * Deal a card 
 * @return a new Card object
 *************************************/
var deal = function() {
    // create a suit from random num between 1 and 4 (4 suits in a deck)
    var suit = Math.floor(Math.random() * 4) + 1;
    // create a card number from random num between 1 and 13 (13 cards in a suit)
    var number = Math.floor(Math.random() * 13) + 1;

    // give a new card back
    return new Card(suit, number);
};

/**************************************
 * Hand object - Representation of a 
 * players hand of n cards
 *************************************/
function Hand() {
    var cards = []; // array of players cards

    // populate players hand with 2 cards to start
    cards.push(deal());
    cards.push(deal());

    /**
     * @return the array of players cards
     */
    this.getCards = function() {
        return cards;
    };
}

















