import { findDocument, insertDocument, listDocuments, deleteDocuments } from './db';

export async function signUp(username: string, password: string) {
    return await insertDocument('users', { username, password });
}

export async function login(username: string, password: string) {
    const user = await findDocument('users', { username });
    return user?.password === password;
}

export async function listTasks(username: string) { 
    return listDocuments('tasks', { username });
}
