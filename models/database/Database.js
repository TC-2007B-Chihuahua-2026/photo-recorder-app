let SQLite = null;

try {
  SQLite = require('expo-sqlite');
} catch (error) {
  SQLite = null;
}

/**
 * Singleton wrapper for the Expo SQLite database used by the photo recorder app.
 */
class Database {
  static instance = null;
  static initialized = false;

  /**
   * Loads the native SQLite module when it is available.
   *
   * @returns {object|null} The SQLite module or null when it cannot be resolved.
   */
  static getNativeSQLite() {
    if (!SQLite) {
      try {
        SQLite = require('expo-sqlite');
      } catch (error) {
        SQLite = null;
      }
    }

    return SQLite;
  }

  /**
   * Lazily creates and configures the singleton database connection.
   *
   * @returns {object|null} A configured SQLite database instance or null if unavailable.
   */
  static getInstance() {
    if (!this.instance) {
      const nativeSQLite = this.getNativeSQLite();

      if (!nativeSQLite || typeof nativeSQLite.openDatabaseSync !== 'function') {
        this.initialized = false;
        return null;
      }

      this.instance = nativeSQLite.openDatabaseSync('photo_recorder.db');
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

  /**
   * Alias for getInstance.
   *
   * @returns {object|null} The singleton database instance.
   */
  static initialize() {
    return this.getInstance();
  }

  /**
   * Alias for getInstance.
   *
   * @returns {object|null} The singleton database instance.
   */
  static getDatabase() {
    return this.getInstance();
  }

  /**
   * Indicates whether the database has already been initialized.
   *
   * @returns {boolean} True when the singleton database is ready.
   */
  static isInitialized() {
    return this.initialized;
  }

  /**
   * Returns the table name as provided. Kept for compatibility with future storage helpers.
   *
   * @param {string} tableName - Table name to normalize.
   * @returns {string} The provided table identifier.
   */
  static getTableName(tableName) {
    return tableName;
  }
}

export default Database;
