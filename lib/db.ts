import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CLIENT;

if (!uri) {
  throw new Error("Missing MONGODB_CLIENT environment variable");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db(process.env.MONGODB_NAME ?? "togetherWe");
