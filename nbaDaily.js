import Logger from "./logger.js";
import chalk from "chalk";
import ApiController from "./apiController.js";

class NbaDaily {
  constructor({ month, day, year }) {
    this.logger = new Logger().getInstance();
    this.url = `https://www.basketball-reference.com/boxscores/?month=${month}&day=${day}&year=${year}`;
  }
  async getDaily() {
    const dom = await new ApiController().requestDom(this.url);
    const { allGamesScores, message } = this.parseDOM(dom);
    this.logger.logTitle("NBA UPDATES");
    this.logger.logSubTitle(message);
    this.parseAndLogGamesAsTable(allGamesScores);
  }
  parseDOM(dom) {
    const content = dom.window.document.getElementById("content");
    const gameTablesContent = [
      ...content.getElementsByClassName("game_summary"),
    ];
    let message;
    switch (gameTablesContent.length) {
      case 0:
        message = "No games played at this date";
        break;
      case 1:
        message = "Found 1 GAME";
        break;
      default:
        message = `Found ${gameTablesContent.length} games`;
    }
    const allGamesScores = gameTablesContent.map((game) => {
      return { ...this.parseTableItem(game) };
    });
    return { allGamesScores, message };
  }

  parseTableItem(game) {
    const winner = this.parseGameTotalScore(
      game.querySelectorAll(".winner td")
    );
    const loser = this.parseGameTotalScore(game.querySelectorAll(".loser td"));
    winner.quartersScore = this.parseQuartersScores(
      game.querySelectorAll("table tbody tr")[2].querySelectorAll("td")
    );
    loser.quartersScore = this.parseQuartersScores(
      game.querySelectorAll("table tbody tr")[3].querySelectorAll("td")
    );
    return { winner, loser };
  }

  parseGameTotalScore(list) {
    return {
      name: list[0].querySelector("a").textContent,
      score: list[1].textContent,
    };
  }

  parseQuartersScores(quartersList) {
    return [
      quartersList[1].textContent,
      quartersList[2].textContent,
      quartersList[3].textContent,
      quartersList[4].textContent,
    ];
  }

  parseAndLogGamesAsTable(games) {
    games.forEach((game) => {
      console.log(
        chalk.green(
          `${chalk.blue.underline.bold(
            game.winner.name
          )} VS ${chalk.red.underline.bold(game.loser.name)}`
        )
      );
      this.logger.logSubTitle(
        `Final: ${game.winner.score} : ${game.loser.score}`
      );
      this.logger.logTable(
        ["", "1", "2", "3", "4"],
        [game.winner.name, ...game.winner.quartersScore],
        [game.loser.name, ...game.loser.quartersScore]
      );
    });
  }
}

export default NbaDaily;
