import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/todos - Fetch all todos
  app.get("/api/todos", async (req, res) => {
    try {
      const todos = await storage.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ 
        error: "Failed to fetch todos",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST /api/todos - Create a new todo
  app.post("/api/todos", async (req, res) => {
    try {
      const validatedData = insertTodoSchema.parse(req.body);
      const newTodo = await storage.createTodo(validatedData);
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ 
          error: "Validation failed",
          message: error.message
        });
      } else {
        res.status(500).json({ 
          error: "Failed to create todo",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
