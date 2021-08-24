require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = `${process.env.DBHOST}:${process.env.DBPORT}`
const client = new MongoClient(url)
const dbName = process.env.DBNAME

async function getDbConnection() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return { client, db };
}

async function get(user) {
    try {
        let { client, db } = await getDbConnection();
        const collection = db.collection('users');
        const results = await collection.find(user).toArray();
        client.close();
        return {
            status: true,
            data: results
        };
    } catch (error) {
        return {
            status: false,
            data: error
        };
    }
}

async function add(user) {
    try {
        let { client, db } = await getDbConnection();
        const collection = db.collection('users');
        const results = await collection.insertMany([user])
        client.close();
        return {
            status: true,
            data: results
        };
    } catch (error) {
        return {
            status: false,
            data: error
        };
    }
}

async function update(user, newData) {
    try {
        let { client, db } = await getDbConnection();
        const collection = db.collection('users');
        const results = await collection.updateOne(user, { $set: newData });
        client.close();
        return {
            status: true,
            data: results
        };
    } catch (error) {
        return {
            status: false,
            data: error
        };
    }
}

async function remove(user) {
    try {
        let { client, db } = await getDbConnection();
        const collection = db.collection('users');
        const results = await collection.deleteMany(user);
        client.close();
        return {
            status: true,
            data: results
        };
    } catch (error) {
        return {
            status: false,
            data: error
        };
    }
}

module.exports = {
    get,
    add,
    update,
    remove
}
