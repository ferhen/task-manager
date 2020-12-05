import { Db, MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://database:27018/products?authSource=admin&ssl=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db: Db;

const connect = async () => {
    await client.connect();
    db = client.db('task-manager');
}

export const findDocument = (collectionName: string, query: any) => {
    const collection = db.collection(collectionName);
    return collection.findOne(query); 
}

export const insertDocument = (collectionName: string, document: any) => {
    const collection = db.collection(collectionName);
    return collection.insertOne(document);
}

export const listDocuments = (collectionName: string, query: any) => {
    const collection = db.collection(collectionName);
    return collection.find(query).toArray();
}

export const deleteDocuments = (collectionName: string) => {
    const collection = db.collection(collectionName);
    return collection.deleteMany({});
}

(async () => await connect())();
