import { MongoClient } from 'mongodb'
import { mongoUri } from '../config'

const client = new MongoClient(mongoUri)

export async function saveActionToDB(action: any) {
  await client.connect()
  const db = client.db('cooperative')
  const collection = db.collection('actions')
  await collection.insertOne(action)
}

export async function saveDeltaToDB(delta: any) {
  await client.connect()
  const db = client.db('cooperative')
  const collection = db.collection('deltas')
  await collection.insertOne(delta)
}
