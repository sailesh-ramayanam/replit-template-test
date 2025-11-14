import { type User, type InsertUser, type Todo, type InsertTodo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllTodos(): Promise<Todo[]>;
  createTodo(todo: InsertTodo): Promise<Todo>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private todos: Map<string, Todo>;

  constructor() {
    this.users = new Map();
    this.todos = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const id = randomUUID();
    const todo: Todo = { ...insertTodo, id };
    this.todos.set(id, todo);
    return todo;
  }
}

export const storage = new MemStorage();
