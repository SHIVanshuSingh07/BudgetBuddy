import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTransactionSchema, insertBudgetSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Transactions
  app.post("/api/transactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const validatedData = insertTransactionSchema.parse({
      ...req.body,
      userId: req.user.id,
      date: new Date(req.body.date),
      // Ensure amount is handled as a string
      amount: req.body.amount.toString(),
    });

    const transaction = await storage.createTransaction(validatedData);
    res.json(transaction);
  });

  app.get("/api/transactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const transactions = await storage.getTransactions(req.user.id);
    res.json(transactions);
  });

  // Budgets
  app.post("/api/budgets", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const validatedData = insertBudgetSchema.parse({
      ...req.body,
      userId: req.user.id,
      // Ensure amount is handled as a string
      amount: req.body.amount.toString(),
    });

    const budget = await storage.createBudget(validatedData);
    res.json(budget);
  });

  app.get("/api/budgets", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const budgets = await storage.getBudgets(req.user.id);
    res.json(budgets);
  });

  app.patch("/api/budgets/:id/spent", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const budget = await storage.updateBudgetSpent(
      parseInt(req.params.id),
      req.body.spent.toString()
    );
    res.json(budget);
  });

  const httpServer = createServer(app);
  return httpServer;
}