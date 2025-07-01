// const playerOneHand = document.querySelector('#player1_hand')
// const playedCards = document.querySelector('#discarded_cards')
// const playCardsButton = document.querySelector('#play')
// document.querySelector('#player1_hand_card').children[0].children[0].src
let deck = []
let rankCards = []
let play = false

class card {
  constructor(rank, cardImage) {
    this.cardImage = cardImage
    this.rank = rank
    this.backCard = 'cards/backGround.jpg'
  }
  getRank = () => {
    return this.rank
  }
  getCardImage = () => {
    return this.cardImage
  }
  getBackGround = () => {
    return this.backCard
  }
}
let jCard = new card('J', 'cards/J.jpg')
let qCard = new card('Q', 'cards/Q.jpg')
let kCard = new card('K', 'cards/k.jpg')
let aceCard = new card('ACE', 'cards/ace.png')
let jokerCard = new card('JOKER', 'cards/joker.jpg')
rankCards = [jCard, qCard, kCard, aceCard]
class player {
  constructor() {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
  }
  setWinCounter = (winCounter) => {
    this.winCounter = winCounter
  }

  setPlayerHand = (hand) => {
    this.playerHand = hand
  }

  getPlayerHand = () => {
    return this.playerHand
  }
  getHealth = () => {
    return this.health
  }
  getWinCounter = () => {
    return this.winCounter
  }
  decrmentHealth = () => {
    this.health--
  }
  restPlayer = () => {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
  }
}
const deckBuilder = () => {
  let randomIndex = 0
  rankCards.forEach((card) => {
    randomIndex = Math.floor(Math.random() * 16)
    for (i = 0; i < 4; i++) {
      if (!deck[randomIndex]) {
        deck[randomIndex] = card
      }
    }
  })
}
deckBuilder()
console.log(deck)
// playCardsButton.addEventListener(() => {
//   console.log(playedCards)
// })
