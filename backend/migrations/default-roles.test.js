describe('Role Migration', () => {
  let queryInterface, Sequelize;

  beforeEach(() => {
    queryInterface = {
      bulkInsert: jest.fn(),
      dropTable: jest.fn(),
    };
    Sequelize = {};
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('up function', () => {
    it('should insert two roles into the roles table', async () => {
      const migration = require('./default-roles');
      await migration.up(queryInterface, Sequelize);

      expect(queryInterface.bulkInsert).toHaveBeenCalledTimes(1);
      expect(queryInterface.bulkInsert).toHaveBeenCalledWith('roles', [
        { id: 1, role_name: 'Administrator', createdAt: expect.any(Date), updatedAt: expect.any(Date) },
        { id: 2, role_name: 'User', createdAt: expect.any(Date), updatedAt: expect.any(Date) },
      ]);
    });
  });

  describe('down function', () => {
    it('should drop the roles table', async () => {
      const migration = require('./default-roles');
      await migration.down(queryInterface, Sequelize);

      expect(queryInterface.dropTable).toHaveBeenCalledTimes(1);
      expect(queryInterface.dropTable).toHaveBeenCalledWith('Users');
    });
  });
});