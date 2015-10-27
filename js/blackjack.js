/**
 * Blackjack engine written in Javascript. 
 */

/**************************************
 * Game runner
 * @author Mark Doucette
 *************************************/



/**************************************
 * Card object
 * @author Mark Doucette
 *************************************/
function Card(suit, num) {
    var mSuit = suit; // private var representing the card suit as an int
    var mNum = num; // private var representing the number 1-13 of the card

    // public getters
    this.getSuit = function() {
        return mSuit;
    };
}
