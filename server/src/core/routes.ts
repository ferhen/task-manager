import express from 'express';
import cors from 'cors';

import { signUp, login, listTasks } from './controller';

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: true }));

router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await signUp(username, password);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await login(username, password);
        return res.send(result);
    } catch (err) {
        if (err.message === 'Duplicate value') {
           return  res.status(403).send({ message: err.message });
        }
        next(err);
    }
});

router.get('/tasks', async (req, res, next) => {
    try {
        const username = 'teste';
        const result = await listTasks(username);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

export default router;
