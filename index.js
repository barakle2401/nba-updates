import NbaDaily from "./nbaDaily.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const main = async () => {
  const { month, day, year } = yargs(hideBin(process.argv)).argv;
  const nbaDaily = new NbaDaily({ month, day, year });
  await nbaDaily.getDaily();
};
main();
