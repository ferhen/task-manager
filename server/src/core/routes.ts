import express, { Request, Response } from 'express';
import cors from 'cors';

import { signUp, login, listTasks, addTask, updateTask, deleteTask } from './controller';

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: true }));

router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await signUp(username, password);
        return res.send(result);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send({ code: 'usernameInUse' });
        }
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await login(username, password);
        if (result === false) {
            return res.status(401).send({ code: 'unauthorized '});
        }
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/tasks', async (req, res, next) => {
    try {
        const username = await authorize(req, res);
        if (!username) {
            return;
        }
        const result = await listTasks(username);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/tasks', async (req, res, next) => {
    try {
        const username = await authorize(req, res);
        if (!username) {
            return;
        }
        const task = {
            username,
            ...req.body
        };

        const { username: addedUsername, ...result } = await addTask(task);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.put('/tasks', async (req, res, next) => {
    try {
        const username = await authorize(req, res);
        if (!username) {
            return;
        }
        const task = req.body;
        const result = await updateTask(task);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/tasks/:id', async (req, res, next) => {
    try {
        const username = await authorize(req, res);
        if (!username) {
            return;
        }
        const taskId = req.params.id;
        const result = await deleteTask(taskId);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

async function authorize(req: Request, res: Response): Promise<string | null> {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ code: 'unauthorized '});
        return null;
    }

    const [ username, password ] = Buffer.from(authorization?.slice(6), 'base64').toString().split(':');
    const isAuthenticated = await login(username, password);
    if (isAuthenticated === false) {
        res.status(401).send({ code: 'unauthorized '});
        return null;
    }

    return username;
}

export default router;
