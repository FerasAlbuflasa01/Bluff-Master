// const playerOneHand = document.querySelector('#player1_hand')
// const playedCards = document.querySelector('#discarded_cards')
const playCardsButton = document.querySelector('#play')
const playerOneHand = document.querySelector('#player1_hand_card')
const playerTwoHand = document.querySelector('#player2_hand_card')
const playerThreeHand = document.querySelector('#player3_hand_card')
const playerFourHand = document.querySelector('#player4_hand_card')
const discardArea = document.querySelector('#discarded_cards')
let deck = []
let rankCards = []
let players = []
let discardedCards = ['', '', '', '', '']
let played = false

class card {
  constructor(rank, cardImage) {
    this.cardImage = cardImage
    this.rank = rank
    this.backCard = 'cards/backCard.jpg'
  }
  getRank = () => {
    return this.rank
  }
  getCardImage = () => {
    return this.cardImage
  }
  getBackCardImage = () => {
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
  constructor(bot, playerHandHtml) {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
    this.bot = bot
    this.playerHandHtml = playerHandHtml
  }
  setWinCounter = (winCounter) => {
    this.winCounter = winCounter
  }

  setPlayerHand = (hand) => {
    this.playerHand = hand
  }
  getPlayerHandHtml = () => {
    return this.playerHandHtml
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
  isBot = () => {
    return this.bot
  }
  decrmentHealth = () => {
    this.health--
  }
  removeCard = (index) => {
    this.playerHand.splice(index, 1)
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
    if (player.isBot()) {
      cardImageElement.src = card.getCardImage()
    } else {
      cardImageElement.src = card.getCardImage()
    }

    cardImageElement.alt = ''
    cardElement.setAttribute('id', card.getRank())
    cardElement.appendChild(cardImageElement)
    playerHandHtml.appendChild(cardElement)
  })
}

const selectCards = (player) => {
  discardedCards = ['', '', '', '', '']
  if (player.isBot()) {
    let numOfCards = Math.floor(Math.random() * 5) + 1
    console.log(numOfCards)
    for (let i = 0; i < numOfCards; i++) {
      let botHand = player.getPlayerHand()
      let indexSelectCard = Math.floor(Math.random() * botHand.length)
      console.log(indexSelectCard)

      if (discardedCards[i] === '') {
        discardedCards[i] = botHand[indexSelectCard].getRank()
        player.removeCard(indexSelectCard)
      }
    }
    console.log(discardedCards)
    console.log(player.getPlayerHand())
  }
}

const displayPlayedCards = () => {
  discardedCards.forEach((card) => {
    if (card) {
      rankCards.forEach((rankCard) => {
        if (rankCard.getRank() === card) {
          let cardElement = document.createElement('li')

          let cardImageElement = document.createElement('img')

          cardImageElement.src = rankCard.getCardImage()

          cardImageElement.alt = ''
          cardElement.setAttribute('id', rankCard.getRank())
          cardElement.appendChild(cardImageElement)
          discardArea.appendChild(cardElement)
        }
      })
    }
  })
}

deckBuilder()
shuffelDeck()
shuffelDeck()

let playerOne = new player(false, playerOneHand)
let playerTwo = new player(true, playerTwoHand)
let playerThree = new player(true, playerThreeHand)
let playerFour = new player(true, playerFourHand)
players = [playerOne, playerTwo, playerThree, playerFour]
deal(players)
let arr1 = players[0].getPlayerHand()
let arr2 = players[1].getPlayerHand()
players.forEach((player) => {
  console.log(player.getPlayerHand())
})
console.log(deck.length)
players.forEach((player) => {
  displayPlayerHand(player.getPlayerHandHtml(), player)
})
selectCards(players[1])
displayPlayedCards()
console.log(`played cards ${discardedCards}`)

//
// eventListeners
let listElement = [...playerOneHand.children]

listElement.forEach((li, index) => {
  li.children[0].addEventListener('click', () => {
    console.log('hi')
    if (discardedCards[index] === '') {
      discardedCards[index] = li.id
    } else if (discardedCards[index] === li.id) {
      discardedCards[index] = ''
    }
    console.log(discardedCards)
  })
})
playCardsButton.addEventListener('click', () => {
  displayPlayedCards()
  console.log(`played cards ${discardedCards}`)
})
