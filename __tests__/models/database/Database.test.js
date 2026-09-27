jest.mock('expo-sqlite', () => {
  const db = {
    execSync: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      openDatabaseSync: jest.fn(() => db),
    },
    openDatabaseSync: jest.fn(() => db),
  };
});

import Database from '../../../models/database/Database';

describe('Database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Database.initialized = false;
    Database.instance = null;
  });

  it('should initialize the database and create the photos table', () => {
    // GIVEN
    const expectedTableName = 'photos';

    // WHEN
    Database.initialize();
    const database = Database.getDatabase();

    // THEN
    expect(database).toBeTruthy();
    expect(Database.isInitialized()).toBe(true);
    expect(Database.getTableName(expectedTableName)).toBe(expectedTableName);
  });
});
