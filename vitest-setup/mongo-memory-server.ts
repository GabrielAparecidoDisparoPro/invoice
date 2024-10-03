import 'reflect-metadata'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { afterAll, afterEach, beforeAll } from 'vitest'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create({
		instance: {
			dbName: 'testing'
		}
	})
	await mongoose.connect(`${mongoServer.getUri()}`, {
		dbName: 'testing'
	})
})

afterEach(async () => {
	const collections = mongoose.connection.collections
	for (const key in collections) {
		const collection = collections[key]
		await collection.deleteMany({})
	}
})

afterAll(async () => {
	await mongoose.connections[0]?.db?.dropDatabase()
	await mongoose.disconnect()
	await mongoose.connection.close()
	await mongoServer.stop()
	return
})
