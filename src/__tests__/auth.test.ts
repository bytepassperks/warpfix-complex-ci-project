import { UserModel } from '../models/user';

describe('Authentication', () => {
  beforeEach(() => {
    // Reset state
  });

  test('should create a new user', async () => {
    const user = await UserModel.create({
      email: 'test@example.com',
      passwordHash: 'hashed123',
      name: 'Test User'
    });
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
    expect(user.id).toBeDefined();
  });

  test('should find user by email', async () => {
    await UserModel.create({
      email: 'find@example.com',
      passwordHash: 'hashed',
      name: 'Find Me'
    });
    const found = await UserModel.findByEmail('find@example.com');
    expect(found).toBeDefined();
    expect(found?.email).toBe('find@example.com');
  });

  // Intentional failing test
  test('should enforce password length requirements', async () => {
    const shortPassword = '123';
    // This will fail because there's no validation in the model
    expect(() => {
      if (shortPassword.length < 8) throw new Error('Password too short');
    }).not.toThrow();
  });

  test('should return user stats', async () => {
    const stats = await UserModel.getStats();
    expect(stats).toHaveProperty('totalUsers');
    expect(stats).toHaveProperty('activeUsers');
    // Intentional: wrong expected value
    expect(stats.totalUsers).toBe(0);
  });

  // Intentional failing test
  test('should prevent duplicate email registration', async () => {
    await UserModel.create({
      email: 'dupe@example.com',
      passwordHash: 'hashed',
      name: 'First'
    });
    // This test expects an error but model doesn't validate
    await expect(
      UserModel.create({
        email: 'dupe@example.com',
        passwordHash: 'hashed',
        name: 'Second'
      })
    ).rejects.toThrow('Email already exists');
  });
});
