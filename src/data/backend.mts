
import express from 'express'

import { MongoClient, ServerApiVersion } from 'mongodb';

export const DB = () => {
    const uri = "mongodb+srv://giangsonart:<password>@cluster0.hbcmdvk.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

}
