import express from 'express'; // ES6 모듈 사용 시
import todoRouter from './routers/todoRouter.js';
import cors from 'cors';

const app = express();
const PORT = 4000;
// body 파싱
app.use(express.json()); // JSON 본문을 파싱
app.use(express.urlencoded({ extended: true }));

// cors

app.use(cors());

app.use('/api/todo',todoRouter)

app.get('/', (req, res) => {
  res.send({ name: 'test' });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
