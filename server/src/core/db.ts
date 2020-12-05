import { Db, MongoClient, ObjectID } from 'mongodb';

const dbHost = process.env.DATABASE?.trim() || 'database';
const client = new MongoClient(`mongodb://${dbHost}:27018/task-manager?authSource=admin&ssl=false`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db: Db;

const connect = async () => {
    await client.connect();
    db = client.db('task-manager');
}

const setupIndex = async () => {
    const usersCollection = db.collection('users');
    usersCollection.createIndex({ 'username': 1 }, { unique: true });
}

export const findDocument = (collectionName: string, query: any) => {
    const collection = db.collection(collectionName);
    return collection.findOne(query); 
}

export const insertDocument = (collectionName: string, document: any) => {
    const collection = db.collection(collectionName);
    return collection.insertOne(document);
}

export const listDocuments = (collectionName: string, query: any, fields = {}) => {
    const collection = db.collection(collectionName);
    return collection.find(query, { fields }).toArray();
}

export const updateDocument = (collectionName: string, document: any) => {
    const { _id, ...documentProperties } = document;
    const collection = db.collection(collectionName);
    return collection.updateOne({ _id: new ObjectID(_id) }, { $set: documentProperties });
}

export const deleteDocument = (collectionName: string, id: string) => {
    const collection = db.collection(collectionName);
    return collection.deleteOne({ _id : new ObjectID(id) });
}

(async () => {
    await connect();
    await setupIndex();   
})();
