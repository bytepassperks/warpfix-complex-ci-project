interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newToday: number;
}

// Intentional: simulated DB (in real app would use mongoose/pg)
const users: User[] = [];

export const UserModel = {
  findByEmail: async (email: string): Promise<User | undefined> => {
    return users.find(u => u.email === email);
  },
  
  findById: async (id: string): Promise<User | undefined> => {
    return users.find(u => u.id === id);
  },

  create: async (data: { email: string; passwordHash: string; name: string }): Promise<User> => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date()
    };
    users.push(user);
    return user;
  },

  getStats: async (): Promise<UserStats> => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.createdAt > new Date(Date.now() - 86400000)).length,
      newToday: users.filter(u => u.createdAt > new Date(Date.now() - 86400000)).length
    };
  }
};
