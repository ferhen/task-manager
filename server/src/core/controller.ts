import { findDocument, insertDocument, listDocuments, deleteDocuments } from './db';

export async function signUp(username: string, password: string) {
    return await insertDocument('users', { username, password });
}

export async function login(username: string, password: string) {
    return await findDocument('users', { username });
}

export async function listTasks(username: string) { 
    return listDocuments('tasks', { username });
}
