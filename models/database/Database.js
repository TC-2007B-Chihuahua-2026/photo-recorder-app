import * as SQLite from 'expo-sqlite';

class Database {
  static instance = null;
  static initialized = false;

  static getInstance() {
    if (!this.instance) {
      if (typeof SQLite.openDatabaseSync !== 'function') {
        return null;
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
    }

    return this.instance;
  }

  static initialize() {
    return this.getInstance();
  }

  static getDatabase() {
    return this.getInstance();
  }

  static isInitialized() {
    return this.initialized;
  }

  static getTableName(tableName) {
    return tableName;
  }
}

export default Database;
