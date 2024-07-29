import express from 'express';
import { deleteTodo, TodoList, TodoList1, updateTodo } from '../controllers/todoController.js';

const todoRouter = express.Router();


todoRouter.post('/todolist',TodoList);
todoRouter.get('/todolist',TodoList1);
// DELETE: TODO 삭제 (특정 ID를 경로에 포함)
todoRouter.delete('/tododelete/:id', deleteTodo);

// PATCH: TODO 수정 (특정 ID를 경로에 포함)
todoRouter.patch('/todoupdate/:id', updateTodo);


export default todoRouter;