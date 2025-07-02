// const playerOneHand = document.querySelector('#player1_hand')
// const playedCards = document.querySelector('#discarded_cards')
// const playCardsButton = document.querySelector('#play')
let playerOneHand = document.querySelector('#player1_hand_card')
let deck = []
let rankCards = []
let players = []
let discardedCards = ['', '', '', '', '']
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
const displayPlayerHand = (playerHandHtml, player) => {
  let playerHand = player.getPlayerHand()
  playerHand.forEach((card) => {
    let cardElement = document.createElement('li')

    let cardImageElement = document.createElement('img')

    cardImageElement.src = card.getCardImage()
    cardImageElement.alt = ''
    cardElement.setAttribute('id', card.getRank())
    cardElement.appendChild(cardImageElement)
    playerHandHtml.appendChild(cardElement)
  })
}
deckBuilder()
shuffelDeck()
shuffelDeck()

let playerOne = new player()
let playerTwo = new player()
players = [playerOne, playerTwo]
deal(players)
let arr1 = players[0].getPlayerHand()
let arr2 = players[1].getPlayerHand()

displayPlayerHand(playerOneHand, players[0])
const selectCards = () => {
  let listElement = [...playerOneHand.children]
  listElement.forEach((li, index) => {
    li.children[0].addEventListener('click', () => {
      if (discardedCards[index] === '') {
        discardedCards[index] = li.id
      } else if (discardedCards[index] === li.id) {
        discardedCards[index] = ''
      }
      console.log(discardedCards)
    })
  })
}

console.log(discardedCards)
playCardsButton.addEventListener(() => {})
