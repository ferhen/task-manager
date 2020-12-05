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
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({ code: 'unauthorized '});
        }

        const [ username, password ] = Buffer.from(authorization?.slice(6), 'base64').toString().split(':');
        const isAuthenticated = await login(username, password);
        if (isAuthenticated === false) {
            return res.status(401).send({ code: 'unauthorized '});
        }

        const result = await listTasks(username);
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

export default router;
