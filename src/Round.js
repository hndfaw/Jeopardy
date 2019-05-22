import data from "./dataset";

class Round {
  constructor(randomCategories, allPlayers) {
    this.data = data;
    this.allPlayers = allPlayers;
    this.roundNumber = 1;
    this.currentTurn = 1;
    this.categoryTitles = this.generateCurrentCategoryTitle(randomCategories);
    this.categoryClues = this.generateCurrentCategoryClues(randomCategories);
  }

  generateCurrentCategoryTitle(randomCategories) {
    return randomCategories.map(category => {
      let final = Object.keys(data.categories).find(key =>
        data.categories[key] === category);
      return final.split(/(?=[A-Z])/).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    });
  }

  generateCurrentCategoryClues(randomCategories) {
    return randomCategories.map(category => {
      return data.clues.reduce((allClues, clue) => {
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
  }

  confirmCurrentPlayer() {
    return this.allPlayers.find(player => player.id === this.currentTurn);
  }

  validateCurrentAnswer(playerInput, clue) {
    if (playerInput.toLowerCase() === clue.answer.toLowerCase()) {
      this.confirmCurrentPlayer().score += clue.pointValue * this.roundNumber;
    } else {
      this.confirmCurrentPlayer().score -= clue.pointValue * this.roundNumber;
    }
  }

}

export default Round; 