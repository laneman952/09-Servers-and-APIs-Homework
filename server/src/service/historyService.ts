import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { promises as fs } from 'node:fs';
// import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  private name: string;
  private id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {}
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const fileStorage = await fs.promises.readFile(path.resolve(__dirname, '../../db/db.json'), 'utf8');
    return JSON.parse(fileStorage);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  // TODO Define an addCity method that adds a city to the searchHistory.json file

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}


export default new HistoryService();