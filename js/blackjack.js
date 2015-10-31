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
     * Display the deck in the console for debug
     */
    this.toString = function() {
        for (var i = 0; i < cards.length; ++i) {
            console.log("Suit: " + cards[i].getSuit()
                       + ", Number: " + cards[i].getNum());
        }  
    };
}

/**************************************
 * Game runner
 * @author Mark Doucette
 *************************************/
var deck;
var playerHand;
var dealerHand;

function PlayBlackJack() {
    deck = new Deck();
    deck.shuffle();
    playerHand = new Hand();
    playerHand.hit(deck.deal());
    playerHand.hit(deck.deal());
    dealerHand = new Hand();
    dealerHand.hit(deck.deal());
    dealerHand.hit(deck.deal());
        
    
};

















