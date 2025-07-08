# project Bluff Master

# Date: 29/6/2025

# By : Feras Albuflasa

[Bulff Maater](https://bluffmaster.surge.sh/)

# _Description_

Bluff Master is a bluff card game where players take turns playing cards face down and trying to manipulate other players into believing they have played the required rank of the card. If a player is caught lying, they have to suffer a consequence.

# _How to play_

Objective:

The last man standing.

Each player's turn either:

1. play as many cards you would like (if you have confidence play more cards :) )

2. call out that perviuos player didn't play the card of the table
   1. if pervoius player laied, his health will decramented by one
   2. if it turns out he didn't lie, your health will decremnted by one

Rules:

1. if player's health reaches zero he is out of the game

2. if player plays all of his cards the round restarts and players out the game are still can't prticpait in new round

3. if the timer is ran out of time in player's turn, his health will be decremnted by one

# Pseudo-code

1. At the start of each round, players are dealt five cards in their hands, and the required rank to play is declared.

2. In each player's turn, the player chooses whether to play the announced rank or not, and they can select as many cards as they would like to play.

3. After a player plays their cards, there will be a 5-second delay to allow other players to call out if there is a bluff.

   3.1 If a player calls out a bluff:

   3.1.1 If there is a bluff, the last player who played will decrement their life by one, then end the round and start from step 1.

   3.1.2 If there is no bluff, the player who called out the bluff will decrement their life by one, then end the round and start from step 1.

   3.2 If a player doesn't call out a bluff, the turn will switch to the next player.

Win Condition:

If a player's health reaches zero, they are out of the game, and the remaining players continue to play until the last standing player wins or the first player has played all their hands and no one calls a bluff against them, or someone calls a bluff and it turns out they played the required rank.

# Wireframes

First HTML page:
![Image](https://i.imgur.com/SaWzTQ9.png)
Second HTML page:
![Image](https://i.imgur.com/kViqxY1.png)

# credits

1. shuffel algorthim (https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm)

2. flip card animation (https://www.w3schools.com/howto/howto_css_flip_card.asp)

3. playing card image (https://opengameart.org/content/playing-cards-vector-png)

4. dealy function (https://www.sitepoint.com/delay-sleep-pause-wait/)
