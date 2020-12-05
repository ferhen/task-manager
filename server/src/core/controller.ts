import { findDocument, insertDocument, listDocuments, deleteDocument, updateDocument } from './db';
import { ITask } from './model';

export async function signUp(username: string, password: string) {
    return await insertDocument('users', { username, password });
}

export async function login(username: string, password: string) {
    const user = await findDocument('users', { username });
    return user?.password === password;
}

export async function listTasks(username: string): Promise<ITask[]> { 
    return listDocuments('tasks', { username }, { username: 0 });
}

export async function addTask(task: ITask): Promise<ITask> {
    return (await insertDocument('tasks', task)).ops[0];
}

export async function updateTask(task: ITask): Promise<ITask> {
    await updateDocument('tasks', task);
    return task;
}

export async function deleteTask(taskId: string) {
    await deleteDocument('tasks', taskId);
    return taskId;
}
