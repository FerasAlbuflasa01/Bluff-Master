# project Bluff Master

# Date: 29/6/2025

# By : Feras Albuflasa

# _Description_

Bluff Master is a bluff card game where players take turns playing cards face down and trying to manipulate other players into believing they have played the required rank of the card. If a player is caught lying, they have to suffer a consequence.

# Pseudo-code

At the start of each round, players are dealt five cards in their hands, and the required rank to play is declared.

In each player's turn, the player chooses whether to play the announced rank or not, and they can select as many cards as they would like to play.

After a player plays their cards, there will be a 5-second delay to allow other players to call out if there is a bluff.

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
