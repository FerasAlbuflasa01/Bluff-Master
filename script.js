// const playerOneHand = document.querySelector('#player1_hand')
// const playedCards = document.querySelector('#discarded_cards')
// const playCardsButton = document.querySelector('#play')
// document.querySelector('#player1_hand_card').children[0].children[0].src
let deck = []
let rankCards = []
let players = []
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
  rankCards.forEach((card) => {
    for (let i = 0; i < 5; i++) {
      deck.push(card)
    }
  })
  rankCards.push(jokerCard)
  deck.push(rankCards[4])
}
const shuffelDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    let currentCard = deck[i]
    deck[i] = deck[randomIndex]
    deck[randomIndex] = currentCard
  }
}
const deal = (players) => {
  let hands = []

  players.forEach((player) => {
    for (let i = 0; i < 5; i++) {
      hands.push(deck[i])
    }
    deck = deck.slice(5)
    player.setPlayerHand(hands)
    hands = []
  })
}
deckBuilder()
shuffelDeck()
// console.log(deck)
let playerOne = new player()
let playerTwo = new player()
players = [playerOne, playerTwo]
deal(players)
let arr1 = players[0].getPlayerHand()
let arr2 = players[1].getPlayerHand()
console.log('player one' + arr1[0].getRank())
console.log('player two' + arr2[0].getRank())
console.log(deck.length)

// playCardsButton.addEventListener(() => {
//   console.log(playedCards)
// })
