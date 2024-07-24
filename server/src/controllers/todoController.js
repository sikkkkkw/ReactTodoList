const todolist =[

]
let nextId = todolist.length > 0 ? Math.max(...todolist.map(item => item.id)) + 1 : 1;
export const TodoList1 = (req, res)=>{
    res.json(todolist);
}

export const TodoList= (req,res)=>{
    const {text,done} = req.body;
    console.log("dwsds",req.body);
    const newTodo = {
        id: nextId++, // nextId를 사용하여 id를 증가시킵니다.
        text,
        done,
    };

    todolist.push(newTodo);
    return res.send('success');
}