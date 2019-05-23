// import turnPrompt from "./index"

class Round {
  constructor(randomCategories, allPlayers, data, roundNumber) {
    this.data = data;
    this.allPlayers = allPlayers;
    this.currentTurn = 1;
    this.roundNumber = roundNumber;
    this.categoryTitles = this.generateCurrentCategoryTitle(randomCategories);
    this.categoryClues = this.generateCurrentCategoryClues(randomCategories);
  }

  generateCurrentCategoryTitle(randomCategories) {
    return randomCategories.map(category => {
      let final = Object.keys(this.data.categories).find(key =>
        this.data.categories[key] === category);
      return final.split(/(?=[A-Z])/).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    });
  }

  generateCurrentCategoryClues(randomCategories) {
    return randomCategories.map(category => {
      return this.data.clues.reduce((allClues, clue) => {
        if (clue.categoryId === category && !allClues.map(clu => clu.pointValue).includes(clue.pointValue)) {
          allClues.push(clue);
        }
        return allClues;
      }, []);
    });
  }

  nextTurn() {
    if (this.currentTurn >= 3) {
      this.currentTurn = 1;
    } else {
      this.currentTurn++;
    }
    // turnPrompt(101, this.currentTurn);
  }

  nextRound() {
    this.roundNumber++;
  }

  confirmCurrentPlayer() {
    return this.allPlayers.find(player => player.id === this.currentTurn);
  }

  validateCurrentAnswer(playerInput, clue) {
    const points = clue.pointValue * this.roundNumber;
    console.log('clue', clue)
    if (playerInput.toLowerCase() === clue.answer.toLowerCase()) {
      this.confirmCurrentPlayer().score += points;
      //invoke DOM update function to relfect game.playerX.score by passing this.confirmCurrentPlayer();
      console.log('player correct', this.confirmCurrentPlayer());
      // turnPrompt(102, this.currentTurn, points);
    } else {
      this.confirmCurrentPlayer().score -= points;
      //invoke DOM update function to relfect game.playerX.score by passing this.confirmCurrentPlayer();
      console.log('player incorrect', this.confirmCurrentPlayer());
      // turnPrompt(103, this.currentTurn, points);
      this.nextTurn();
    }
  }

  generateDailyDoublePosition() {
    return [Math.floor(Math.random() * (4)), Math.floor(Math.random() * (4))];
  }

}

export default Round;