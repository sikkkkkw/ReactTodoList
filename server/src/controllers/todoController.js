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
        date: new Date().toISOString() 
    };

    todolist.push(newTodo);
    return res.send('success');
}

// PUT 또는 PATCH 요청으로 수정할 수 있습니다.
export const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text,done } = req.body;

    // ID에 해당하는 항목을 찾습니다.
    const todoIndex = todolist.findIndex(item => item.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).send('Todo not found');
    }

    // 항목을 업데이트합니다.
    if (text !== undefined) todolist[todoIndex].text = text;
    if (done !== undefined) todolist[todoIndex].done = done;

    return res.send('Todo updated successfully');
};

// 삭제
export const deleteTodo = (req, res) => {
    const { id } = req.params;

    // ID에 해당하는 항목의 인덱스를 찾습니다.
    const todoIndex = todolist.findIndex(item => item.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).send('Todo not found');
    }

    // 항목을 배열에서 제거합니다.
    todolist.splice(todoIndex, 1);

    return res.send('Todo deleted successfully');
};
