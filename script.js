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
    this.yourTurn = false
    this.name = ''
  }
  setName = (name) => {
    this.name = name
  }
  setWinCounter = (winCounter) => {
    this.winCounter = winCounter
  }

  setPlayerHand = (hand) => {
    this.playerHand = hand
  }
  setYourTurn = (yourTurn) => {
    this.yourTurn = yourTurn
    return this.yourTurn
  }
  setHealth = (health) => {
    this.health = health
  }
  getName = () => {
    return this.name
  }
  getPlayerHandHtml = () => {
    return this.playerHandHtml
  }
  getYourTurn = () => {
    return this.yourTurn
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
const showRank = document.querySelector('h2')
const PlayerOneBluff = document.querySelector('#bluff')
let deck = []
let rankCards = []
let players = []
let discardedCards = ['', '', '', '', '']
let win = false
let isplayerOneTurn = false
let jCard = new card('J', 'cards/J.jpg')
let qCard = new card('Q', 'cards/Q.jpg')
let kCard = new card('K', 'cards/k.jpg')
let aceCard = new card('ACE', 'cards/ace.png')
let jokerCard = new card('JOKER', 'cards/joker.jpg')
let playerOne = new player(false, playerOneHand)
playerOne.setName('playerOne')
let playerTwo = new player(true, playerTwoHand)
let playerThree = new player(true, playerThreeHand)
let playerFour = new player(true, playerFourHand)
players = [playerOne, playerFour, playerThree, playerTwo]
//players = [playerOne, playerFour]
let timeOutIDs = []
let tableRank
rankCards = [jCard, qCard, kCard, aceCard]

const choseTableRank = () => {
  console.log(rankCards)
  let randomPick = Math.floor(Math.random() * rankCards.length)
  return rankCards[randomPick]
}
// it builds a deck of cards by itterating each elements in rankCards array and create 5 copies of each rank card and after duplication add only one joker card
const deckBuilder = () => {
  deck = []
  rankCards = [jCard, qCard, kCard, aceCard]
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
    displayPlayerHand(player.getPlayerHandHtml(), player)
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
    let botHand = player.getPlayerHand()
    let numOfCards = Math.floor(Math.random() * botHand.length) + 1
    for (let i = 0; i < numOfCards; i++) {
      //botHand.length to make suer that array lentgth is being updated after removing a card
      let indexSelectCard = Math.floor(Math.random() * botHand.length)
      console.log('card index= ' + indexSelectCard)
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
  let PlayedArea
  if (Bluff) {
    PlayedArea = perviuos
  } else {
    PlayedArea = discardedCards
  }
  PlayedArea.forEach((card) => {
    if (card) {
      rankCards.forEach((rankCard) => {
        if (rankCard.getRank() === card) {
          const cardElement = document.createElement('div')
          cardElement.classList.add('card')

          const front = document.createElement('li')
          front.classList.add('front')
          const frontImage = document.createElement('img')
          frontImage.src = rankCard.getCardImage()
          frontImage.alt = 'Front'
          front.appendChild(frontImage)

          const back = document.createElement('li')
          back.classList.add('back')
          const backImage = document.createElement('img')
          backImage.src = rankCard.getBackCardImage()
          backImage.alt = 'Back'
          back.appendChild(backImage)
          cardElement.appendChild(back)
          cardElement.appendChild(front)

          discardArea.appendChild(cardElement)

          if (Bluff) {
            console.log('flip!!')

            setTimeout(() => {
              cardElement.classList.add('is-flipped')
            }, 600)
          }
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
  let numOfEmptyStrings = array.length - newArray.length
  for (let i = 0; i < numOfEmptyStrings; i++) {
    newArray.push('')
  }
  return newArray
}
const countCards = (arr) => {
  let numOfCards = 0
  arr.forEach((card) => {
    if (card !== '') {
      numOfCards++
    }
  })
  return numOfCards
}
let Bluff = false
const botTurn = (bot, perviuosDiscard) => {
  let numOfCards = countCards(perviuosDiscard)
  console.log(numOfCards)

  if (numOfCards > 3) {
    Bluff = true
    console.log('lair shoot him!!!')
    return
  }
  selectCards(bot)

  displayPlayedCards()

  displayPlayerHand(bot.getPlayerHandHtml(), bot)
}

const Timer = () => {
  let counter = 30
  let id = setInterval(() => {
    console.log(counter)
    counter--
    if (counter < 0) {
      clearInterval(id)
    }
  }, 1000)
}

const startRound = () => {
  discardedCards = ['', '', '', '', '']
  rankCards = [jCard, qCard, kCard, aceCard]
  currentPlayerIndex = 0
  Bluff = false
  tableRank = choseTableRank()
  showRank.innerText = `${tableRank.getRank()} Tabe`
  displayPlayedCards()
  console.log(deck)
  deckBuilder()
  console.log(deck)
  shuffelDeck()
  shuffelDeck()
  deal(players)
  players.forEach((player) => {
    displayPlayerHand(player.getPlayerHandHtml(), player)
  })
  attachBluff()
  attachImageListeners()
}
function attachImageListeners() {
  let listElement = [...playerOneHand.children]

  listElement.forEach((li, index) => {
    li.children[0].addEventListener('click', () => {
      console.log(isplayerOneTurn)
      if (isplayerOneTurn) {
        // allows to select card
        if (discardedCards[index] === '') {
          discardedCards[index] = li.id
          // allows to unselect card
        } else if (discardedCards[index] === li.id) {
          discardedCards[index] = ''
        }
        console.log(discardedCards)
      }
    })
  })
}
const attachBluff = () => {
  PlayerOneBluff.addEventListener('click', () => {
    if (isplayerOneTurn && perviuos[0] !== '') {
      discardedCards = ['', '', '', '', '']
      Bluff = true
      bluffLogic()
      Bluff = false
      isplayerOneTurn = players[0].setYourTurn(false)
    }
  })
}
let currentPlayerIndex = 0
let perviuos = []
let perviuosPlayerIndex = 0
let id
const bluffLogic = () => {
  let countMactingRanks = 0
  displayPlayedCards()
  setTimeout(() => {
    perviuos.forEach((cardRank) => {
      if (cardRank === tableRank.getRank() || cardRank === 'JOKER') {
        countMactingRanks++
      }
    }, 0)
    let numOfCards = countCards(perviuos)
    perviuosPlayerIndex = getPreviousIndex(currentPlayerIndex)
    console.log(countMactingRanks + ' =?' + numOfCards)
    if (countMactingRanks === numOfCards) {
      let health = players[currentPlayerIndex].getHealth()
      health--
      players[currentPlayerIndex].setHealth(health)
      console.log(
        'current player health ' + players[currentPlayerIndex].getHealth()
      )
    } else {
      let health = players[perviuosPlayerIndex].getHealth()
      health--
      console.log('pervious index= ' + perviuosPlayerIndex)
      players[perviuosPlayerIndex].setHealth(health)
      console.log(
        'pervious player health ' + players[perviuosPlayerIndex].getHealth()
      )
    }
    if (players[currentPlayerIndex].getHealth() === 0) {
      discardedCards = ['', '', '', '', '']
      let hand = []
      players[currentPlayerIndex].setPlayerHand(hand)
      displayPlayerHand(
        players[currentPlayerIndex].getPlayerHandHtml(),
        players[currentPlayerIndex]
      )
      players.splice(currentPlayerIndex, 1)
    } else if (players[perviuosPlayerIndex].getHealth() === 0) {
      discardedCards = ['', '', '', '', '']
      let hand = []
      players[perviuosPlayerIndex].setPlayerHand(hand)
      displayPlayerHand(
        players[perviuosPlayerIndex].getPlayerHandHtml(),
        players[perviuosPlayerIndex]
      )
      players.splice(perviuosPlayerIndex, 1)
    }

    console.log(players)
    console.log('bang bang')
    perviuos = []

    startRound()
  }, 10000)
}
const getPreviousIndex = (currentIndex) => {
  if (currentIndex === 0) {
    return players.length - 1
  }
  return (currentIndex - 1) % players.length
}
// setTimeout in a loop solution from [https://how.dev/answers/how-to-add-a-delay-in-a-js-loop] under Example 1

const playerTurn = () => {
  if (players.length === 1) {
    console.log(players[currentPlayerIndex] + ' wins!')
    return
  }
  console.log(`Player ${currentPlayerIndex + 1}'s turn!`)
  if (players[currentPlayerIndex].getName() === 'playerOne') {
    isplayerOneTurn = players[0].setYourTurn(true)
    console.log(isplayerOneTurn)
  } else {
    botTurn(players[currentPlayerIndex], perviuos)
  }

  perviuos = discardedCards

  if (Bluff) {
    bluffLogic()
  }
  if (players[currentPlayerIndex].getPlayerHand().length === 0) {
    perviuos = []

    startRound()
  }
  console.log(currentPlayerIndex)

  console.log(currentPlayerIndex)

  id = setTimeout(() => {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length

    playerTurn()
  }, 30000)
}

//
// eventListeners
//
startRound()
playerTurn()

playCardsButton.addEventListener('click', () => {
  if (isplayerOneTurn) {
    perviuos = discardedCards
    displayPlayedCards()
    discardedCards = removeEmptySpaces(discardedCards)
    console.log(discardedCards)
    discardedCards.forEach((playedCard, indexPlayed) => {
      let updatedHand = players[0].getPlayerHand()

      for (let i = 0; i < updatedHand.length; i++) {
        if (playedCard === updatedHand[i].getRank()) {
          players[0].removeCard(i)
          break
        }
      }
    })
    let playerHand = players[0].getPlayerHand()
    playerHand.forEach((card) => {
      console.log(card.getRank())
    })

    displayPlayerHand(players[0].getPlayerHandHtml(), players[0])

    isplayerOneTurn = players[0].setYourTurn(false)
  }
})
