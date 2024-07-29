import express from 'express';
import { deleteTodo, TodoList, TodoListadd, updateTodo } from '../controllers/todoController.js';

const todoRouter = express.Router();


todoRouter.post('/todolist',TodoListadd);
todoRouter.get('/todolist',TodoList);
// DELETE: TODO 삭제 (특정 ID를 경로에 포함)
todoRouter.delete('/tododelete/:id', deleteTodo);

// PATCH: TODO 수정 (특정 ID를 경로에 포함)
todoRouter.put('/todoupdate/:id', updateTodo);


export default todoRouter;