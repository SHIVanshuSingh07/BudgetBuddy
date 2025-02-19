import { InsertUser, User, Transaction, Budget, InsertTransaction, InsertBudget } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Transaction methods
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactions(userId: number): Promise<Transaction[]>;

  // Budget methods
  createBudget(budget: InsertBudget): Promise<Budget>;
  getBudgets(userId: number): Promise<Budget[]>;
  updateBudgetSpent(id: number, spent: string): Promise<Budget>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private budgets: Map<number, Budget>;
  sessionStore: session.Store;
  private currentId: { users: number; transactions: number; budgets: number };

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.budgets = new Map();
    this.currentId = { users: 1, transactions: 1, budgets: 1 };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentId.transactions++;
    const newTransaction: Transaction = { 
      ...transaction,
      id,
      // Ensure amount is stored as a string
      amount: transaction.amount.toString(),
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (t) => t.userId === userId,
    );
  }

  async createBudget(budget: InsertBudget): Promise<Budget> {
    const id = this.currentId.budgets++;
    const newBudget: Budget = { 
      ...budget,
      id,
      // Ensure amount and spent are stored as strings
      amount: budget.amount.toString(),
      spent: "0",
    };
    this.budgets.set(id, newBudget);
    return newBudget;
  }

  async getBudgets(userId: number): Promise<Budget[]> {
    return Array.from(this.budgets.values()).filter(
      (b) => b.userId === userId,
    );
  }

  async updateBudgetSpent(id: number, spent: string): Promise<Budget> {
    const budget = this.budgets.get(id);
    if (!budget) throw new Error('Budget not found');
    const updatedBudget = { 
      ...budget,
      // Ensure spent is stored as a string
      spent: spent.toString(),
    };
    this.budgets.set(id, updatedBudget);
    return updatedBudget;
  }
}

export const storage = new MemStorage();