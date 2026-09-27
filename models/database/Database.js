import * as SQLite from 'expo-sqlite';

class Database {
  static instance = null;
  static initialized = false;

  static initialize() {
    if (this.initialized) {
      return this.instance;
    }

    this.instance = SQLite.openDatabaseSync('photo_recorder.db');
    this.instance.execSync(`
      CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        latitude REAL,
        longitude REAL
      );
    `);

    this.initialized = true;
    return this.instance;
  }

  static getDatabase() {
    if (!this.initialized) {
      return this.initialize();
    }

    return this.instance;
  }

  static isInitialized() {
    return this.initialized;
  }

  static getTableName(tableName) {
    return tableName;
  }
}

export default Database;
