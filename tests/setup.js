import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";

// Setup database connection and cleanup for tests
dotenv.config();
let mongoServer;

beforeAll(async () => {
  // Always use in-memory server for tests
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  // Drop database and close connection
  if (mongoose.connection.db) {
    await mongoose.connection.dropDatabase();
  }
  await mongoose.connection.close();

  if (mongoServer) {
    await mongoServer.stop();
  }
});

export default app;