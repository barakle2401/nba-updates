import cfonts from "cfonts";
import Table from "cli-table3";

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Logger();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

class Logger {
  logTitle(title) {
    cfonts.say(`-${title}-`, {
      background: "transparent",
      space: true,
      maxLength: "0",
      gradient: ["red", "blue"],
      independentGradient: false,
      transitionGradient: false,
      env: "node",
    });
  }

  logSubTitle(subTitle) {
    cfonts.say(subTitle, {
      font: "console",
      align: "left",
      colors: ["yellowBright"],
      letterSpacing: 1,
      transitionGradient: false,
      env: "node",
    });
  }
  logTable(headers = [], ...rows) {
    const table = new Table({
      chars: { mid: "-", "left-mid": "-", "mid-mid": "-", "right-mid": "-" },
    });
    table.push(headers);
    rows.forEach((row) => table.push(row));
    console.log(table.toString());
  }
}

export default Singleton;
