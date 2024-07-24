import express from 'express';
import { TodoList, TodoList1 } from '../controllers/todoController.js';

const todoRouter = express.Router();


todoRouter.post('/todolist',TodoList);
todoRouter.get('/todolist',TodoList1);

export default todoRouter;