import fs from "fs";
import path from "path";

const FILE_PATH = path.join("./src/data", "blacklist.json");

export const getBlacklist = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const blacklist = JSON.parse(data || "[]") as string[];
    return blacklist;
  } catch (err) {
    console.error(err);
  }
};

export const saveBlackList = (blacklist: string[]) => {
  try {
    const data = JSON.stringify(blacklist);
    fs.writeFileSync(FILE_PATH, data);
  } catch (err) {
    console.error(err);
  }
};
