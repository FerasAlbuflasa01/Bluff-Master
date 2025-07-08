class card {
  constructor(rank, cardImage) {
    this.cardImage = cardImage
    this.rank = rank
    this.backCard = 'cards/backCard.png'
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
  constructor(bot, playerHandHtml, playerInfoHtml) {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
    this.bot = bot
    this.playerHandHtml = playerHandHtml
    this.yourTurn = false
    this.forcedBluff = false
    this.name = ''
    this.playerInfoHtml = playerInfoHtml
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
  setforcedToBluff = (forcedBluff) => {
    this.forcedBluff = forcedBluff
    return this.forcedBluff
  }
  setHealth = (health) => {
    this.health = health
  }
  getPlayerInfoHtml = () => {
    return this.playerInfoHtml
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
const playerOneInfo = document.querySelector('#player1_info')
const playerTwoInfo = document.querySelector('#player2_info')
const playerThreeInfo = document.querySelector('#player3_info')
const playerFourInfo = document.querySelector('#player4_info')
const showRank = document.querySelector('h2')
const PlayerOneBluff = document.querySelector('#bluff')
let deck = []
let rankCards = []
let players = []
let discardedCards = ['', '', '', '', '']
let win = false
let isplayerOneTurn = false
let jCard = new card('J', 'cards/J.png')
let qCard = new card('Q', 'cards/Q.png')
let kCard = new card('K', 'cards/K.png')
let aceCard = new card('ACE', 'cards/ace.png')
let jokerCard = new card('JOKER', 'cards/joker.jpg')
let playerOne = new player(false, playerOneHand, playerOneInfo)
playerOne.setName('playerOne')
let playerTwo = new player(true, playerTwoHand, playerTwoInfo)
playerTwo.setName('bot3')
let playerThree = new player(true, playerThreeHand, playerThreeInfo)
playerThree.setName('bot2')
let playerFour = new player(true, playerFourHand, playerFourInfo)
playerFour.setName('bot1')
players = [playerOne, playerFour, playerThree, playerTwo]
let timeOutIDs = []
let tableRank
rankCards = [jCard, qCard, kCard, aceCard]
let isStartRound = true

const choseTableRank = () => {
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
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
// displayPlayerHand shows the player's card in html
//first it check if there is any list items by the help of removeAllChild function and after that it creates list item for each card that player has and then append to the parent
const displayPlayerHand = async (playerHandHtml, player) => {
  removeAllChild(playerHandHtml)
  let playerHand = player.getPlayerHand()
  for (let card of playerHand) {
    let cardElement = document.createElement('li')

    let cardImageElement = document.createElement('img')
    if (player.isBot()) {
      cardImageElement.src = card.getBackCardImage()
    } else {
      cardImageElement.src = card.getCardImage()
    }

    cardImageElement.alt = ''
    cardElement.setAttribute('id', card.getRank())
    cardElement.appendChild(cardImageElement)
    playerHandHtml.appendChild(cardElement)
  }

  isStartRound = false
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
      if (discardedCards[i] === '') {
        discardedCards[i] = botHand[indexSelectCard].getRank()
        //to make suer that bot doesn't select the same cards at the some position twice
        player.removeCard(indexSelectCard)
      }
    }
  }
}
let MatchIndexes = []
const isCorrectUi = (array) => {
  let cardDiv = document.querySelectorAll('.card')

  let cardDivArray = [...cardDiv]
  array.forEach((card) => {
    cardDivArray[card].children[0].children[0].style.border = '5px solid green'
    cardDivArray[card].children[1].children[0].style.border = '5px solid green'
  })
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
          delay(4000)
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
            delay(3000).then(() => {
              cardElement.classList.add('is-flipped')
            })
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
const botTurn = async (bot, perviuosDiscard) => {
  let numOfCards = countCards(perviuosDiscard)
  let randomBluff = Math.floor(Math.random() * 2)
  if (randomBluff === 1 && perviuosDiscard.length !== 0) {
    Bluff = true
    document.querySelector('#message').innerText = 'lair shoot him!!!'

    return
  }
  selectCards(bot)

  displayPlayerHand(bot.getPlayerHandHtml(), bot)

  displayPlayedCards()
}
let stopTimer = false
const startRound = async () => {
  discardedCards = ['', '', '', '', '']
  rankCards = [jCard, qCard, kCard, aceCard]

  Bluff = false
  isStartRound = true
  tableRank = choseTableRank()
  showRank.innerText = `${tableRank.getRank()} Tabe`
  displayPlayedCards()
  MatchIndexes = []

  deckBuilder()

  shuffelDeck()
  shuffelDeck()
  deal(players)

  attachBluff()
  attachImageListeners()
}
attachImageListeners = () => {
  let listElement = [...playerOneHand.children]

  listElement.forEach((li, index) => {
    li.children[0].addEventListener('click', () => {
      if (isplayerOneTurn) {
        // allows to select card
        if (discardedCards[index] === '') {
          discardedCards[index] = li.id
          li.children[0].style.border = '5px solid green'
          // allows to unselect card
        } else if (discardedCards[index] === li.id) {
          li.children[0].style.border = ''
          discardedCards[index] = ''
        }
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
      stopTimer = true
      document.querySelector('#turn').innerText = 'lair shoot him!!!'
    }
  })
}

let currentPlayerIndex = 0
let perviuos = []
let perviuosPlayerIndex = 0
let id
const updateHealthUi = (playerIndex, playerHealth) => {
  let playerHearts = playerIndex.children[1]
  if (playerHealth === 2) {
    playerHearts.querySelector(`#heart${playerHealth + 1}`).style.color =
      'black'
  } else if (playerHealth === 1) {
    playerHearts.querySelector(`#heart${playerHealth + 1}`).style.color =
      'black'
  } else if (playerHealth === 0) {
    playerHearts.querySelector(`#heart${playerHealth + 1}`).style.color =
      'black'
  } else {
    return
  }
}
const bluffLogic = () => {
  let countMactingRanks = 0

  perviuos.forEach((cardRank, index) => {
    if (cardRank === tableRank.getRank() || cardRank === 'JOKER') {
      countMactingRanks++
      MatchIndexes.push(index)
    }
  })
  displayPlayedCards()
  delay(5000).then(() => {
    document.querySelector('#message').innerText = ''
    isCorrectUi(MatchIndexes)
  })

  let numOfCards = countCards(perviuos)
  perviuosPlayerIndex = getPreviousIndex(currentPlayerIndex)

  if (countMactingRanks === numOfCards && numOfCards !== 0) {
    let health = players[currentPlayerIndex].getHealth()
    health--
    players[currentPlayerIndex].setHealth(health)

    updateHealthUi(players[currentPlayerIndex].getPlayerInfoHtml(), health)
  } else if (numOfCards !== 0) {
    let health = players[perviuosPlayerIndex].getHealth()
    health--

    players[perviuosPlayerIndex].setHealth(health)

    updateHealthUi(players[perviuosPlayerIndex].getPlayerInfoHtml(), health)
  }

  perviuos = []

  delay(7000).then(() => {
    startRound()
  })
}
const getPreviousIndex = (currentIndex) => {
  if (currentIndex === 0) {
    return players.length - 1
  }
  return (currentIndex - 1) % players.length
}

// setTimeout in a loop solution from [https://how.dev/answers/how-to-add-a-delay-in-a-js-loop] under Example 1
let playerId
const playerTurn = async () => {
  await delay(2000)
  stopTimer = false

  document.querySelector('#message').innerText = ''
  if (players.length === 1) {
    if (players[currentPlayerIndex].getName() === 'playerOne') {
      document.querySelector('#turn').innerText = 'You Won!!!'
    } else {
      document.querySelector(
        '#turn'
      ).innerText = `${players[0].getName()} Won!!!`
    }

    return
  } else if (players.length === 0) {
    perviuos = []
    startRound()
  }

  document.querySelector('#turn').innerText = `${players[
    currentPlayerIndex
  ].getName()}'s turn!`

  if (players[currentPlayerIndex].getName() === 'playerOne') {
    let count = 15
    playerId = setInterval(() => {
      document.querySelector('#timer').innerText = `Timer: ${count}`
      count--
      if (stopTimer) {
        clearInterval(playerId)
      }
    }, 1000)
    document.querySelector('#turn').innerText = `your turn!`
    isplayerOneTurn = players[0].setYourTurn(true)
  } else {
    document.querySelector('#timer').innerText = ``
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

  await delay(15000)
  stopTimer = false
  clearInterval(playerId)
  if (players[currentPlayerIndex].getYourTurn()) {
    document.querySelector('#message').innerText =
      'Timer is up, -1 to your health'
    await delay(4000)
    let health = players[currentPlayerIndex].getHealth()
    health--
    isplayerOneTurn = players[0].setYourTurn(false)
    perviuos = []
    players[currentPlayerIndex].setHealth(health)
    updateHealthUi(players[currentPlayerIndex].getPlayerInfoHtml(), health)

    document.querySelector('#message').innerText = ''
  }
  if (players[currentPlayerIndex].getHealth() === 0) {
    updateHealthUi(players[currentPlayerIndex].getPlayerInfoHtml(), 0)
    discardedCards = ['', '', '', '', '']
    let hand = []
    players[currentPlayerIndex].setPlayerHand(hand)
    displayPlayerHand(
      players[currentPlayerIndex].getPlayerHandHtml(),
      players[currentPlayerIndex]
    )
    players.splice(currentPlayerIndex, 1)
  }
  if (players[perviuosPlayerIndex].getHealth() === 0) {
    updateHealthUi(players[perviuosPlayerIndex].getPlayerInfoHtml(), 0)
    discardedCards = ['', '', '', '', '']
    let hand = []
    players[perviuosPlayerIndex].setPlayerHand(hand)
    displayPlayerHand(
      players[perviuosPlayerIndex].getPlayerHandHtml(),
      players[perviuosPlayerIndex]
    )
    players.splice(perviuosPlayerIndex, 1)
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length

  playerTurn()
}
const firstRound = async () => {
  startRound()
  await delay(8000)
  playerTurn()
}
firstRound()

//
// eventListeners
//

playCardsButton.addEventListener('click', () => {
  if (isplayerOneTurn) {
    perviuos = discardedCards
    displayPlayedCards()
    discardedCards = removeEmptySpaces(discardedCards)
    discardedCards.forEach((playedCard, indexPlayed) => {
      let updatedHand = players[0].getPlayerHand()

      for (let i = 0; i < updatedHand.length; i++) {
        if (playedCard === updatedHand[i].getRank()) {
          players[0].removeCard(i)
          break
        }
      }
    })

    displayPlayerHand(players[0].getPlayerHandHtml(), players[0])

    isplayerOneTurn = players[0].setYourTurn(false)
    stopTimer = true
  }
})
