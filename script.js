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
//  global variables
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

let jCard = new card('J', 'cards/J.jpg')
let qCard = new card('Q', 'cards/Q.jpg')
let kCard = new card('K', 'cards/k.jpg')
let aceCard = new card('ACE', 'cards/ace.png')
let jokerCard = new card('JOKER', 'cards/joker.jpg')
rankCards = [jCard, qCard, kCard, aceCard]

// it builds a deck of cards by itterating each elements in rankCards array and create 5 copies of each rank card and after duplication add only one joker card
const deckBuilder = () => {
  rankCards.forEach((card) => {
    for (let i = 0; i < 5; i++) {
      deck.push(card)
    }
  })
  rankCards.push(jokerCard)
  deck.push(rankCards[4])
}
//this sloution got from Fisher-Yates shuffel[https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/]
//where it swaps the current index with a random index in the array
const shuffelDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    let currentCard = deck[i]
    deck[i] = deck[randomIndex]
    deck[randomIndex] = currentCard
  }
}
// deal funtion it deals 5 cards to all players and after dealing to each player remove the delted cards
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
// the sloution got from GDN doucmentation [https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild]
// the idea is to remove all list items in html
//this function helps to update player hands visually  after player plays the cards that he wants by removing all list items that has been shown previously
const removeAllChild = (areaHtml) => {
  let listElements = [...areaHtml.children]
  if (listElements.length) {
    while (areaHtml.firstChild) {
      areaHtml.removeChild(areaHtml.firstChild)
    }
  }
}
// displayPlayerHand shows the player's card in html
//first it check if there is any list items by the help of removeAllChild function and after that it creates list item for each card that player has and then append to the parent
const displayPlayerHand = (playerHandHtml, player) => {
  removeAllChild(playerHandHtml)
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
// selectCards is built for bots where it selects how many cards that it wants to play(randomly) and then select cards from the hand(randomly) and play them(save them in discardedCards array).
const selectCards = (player) => {
  discardedCards = ['', '', '', '', '']
  if (player.isBot()) {
    let numOfCards = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i < numOfCards; i++) {
      let botHand = player.getPlayerHand()
      //botHand.length to make suer that array lentgth is being updated after removing a card
      let indexSelectCard = Math.floor(Math.random() * botHand.length)
      if (discardedCards[i] === '') {
        discardedCards[i] = botHand[indexSelectCard].getRank()
        //to make suer that bot doesn't select the same cards at the some position twice
        player.removeCard(indexSelectCard)
      }
    }
  }
}
// displayPlayedCards it displays the card that has been played it has functionalty as displayPlayerHand but without needing to check if player is bot or not since the played cards will be displayed as face down
const displayPlayedCards = () => {
  removeAllChild(discardArea)
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
// thhis function it removes empty strings from an array
const removeEmptySpaces = (array) => {
  let newArray = array.filter((listElement) => {
    return listElement !== ''
  })
  return newArray
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
// selectCards(players[1])
// displayPlayedCards()
console.log(`played cards ${discardedCards}`)

//
// eventListeners
let listElement = [...playerOneHand.children]

listElement.forEach((li, index) => {
  li.children[0].addEventListener('click', () => {
    // allows to select card
    if (discardedCards[index] === '') {
      discardedCards[index] = li.id
      // allows to unselect card
    } else if (discardedCards[index] === li.id) {
      discardedCards[index] = ''
    }
    console.log(discardedCards)
  })
})
playCardsButton.addEventListener('click', () => {
  displayPlayedCards()
  discardedCards = removeEmptySpaces(discardedCards)
  console.log(discardedCards)
  discardedCards.forEach((playedCard) => {
    let updatedHand = players[0].getPlayerHand()
    updatedHand.forEach((handCard, index) => {
      if (playedCard === handCard.getRank()) {
        players[0].removeCard(index)
      }
    })
  })

  displayPlayerHand(players[0].getPlayerHandHtml(), players[0])
})
