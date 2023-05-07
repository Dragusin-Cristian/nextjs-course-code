import { MongoClient } from "mongodb";

export async function connectToDb() {
  const client = await MongoClient.connect("mongodb+srv://Cristian:T5ykxDSjBnpBKJPN@cluster0.rxv84.mongodb.net/auth-demo?retryWrites=true&w=majority");
  return client;
}