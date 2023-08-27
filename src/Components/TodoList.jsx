
import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';


const TodoList = () => {

    const [todo, setTodo] = useState('');
    const [task, setTask] = useState([]);
    const [editBtn, setEditBtn] = useState(true);
    const [editItemId, setEditItemId] = useState(null);

    const InputEvent = (e) => {

        let Value = e.target.value;
        setTodo(Value)

    }

    const addTask = () => {

        if (!todo) {
            alert('Please Add Your Task')
        }
        else if (todo && !editBtn) {
            setTask(
                task.map((elem) => {
                    if (elem.id === editItemId) {
                        return {
                            ...elem, name: todo
                        }
                    }
                    return elem;
                })
            )
            setEditBtn(!editBtn);

            setTodo('')

            setEditItemId(null);


        }
        else {
            const allTodoList = { id: new Date().getTime().toString(), name: todo }
            setTask((preVal) => {
                return [...preVal, allTodoList]
            })
            setTodo('')


        }
    }

    const EditTask = (id) => {

        let newEditItem = task.find((elmt) => {
            return (
                elmt.id === id
            )
        })
        setEditBtn(!editBtn);

        setTodo(newEditItem.name)

        setEditItemId(id);


    }

    const DelTask = (index) => {

        const filterVal = task.filter((elmt) => {
            return index !== elmt.id
        })
        setTask(filterVal)
    }

    const DeleteAll =()=>{
       
            setTask([])
        
    }


    return (
        <>

            <div className="container">
                <div className="todoCont">
                    <div className="TopHead">
                        <h1 className="Heading">DoTick</h1>
                    </div>
                    <div className="divider"></div>
                    <div className="inputArea">
                        <input type="text" id="input" value={todo} onChange={InputEvent} autoComplete="off" placeholder="Enter Your Tasks" />
                        {
                            editBtn ?
                                <button onClick={addTask}>Add</button> :
                                <button onClick={addTask}>Edit</button>
                        }
                    </div>
                    <div className="listArea">
                        <ul>
                            {task.map((item) => {
                                return (
                                    <li className="list" key={item.id}>
                                        {item.name}
                                        <div >
                                            <EditNoteIcon className="Tick" onClick={() => EditTask(item.id)}>Edit</EditNoteIcon>
                                            <DeleteForeverIcon className="Del" onClick={() => DelTask(item.id)} >Del</DeleteForeverIcon>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Button id="DelBtn" onClick={DeleteAll}>Delete All</Button>
            </div>


        </>
    )

}

export default TodoList;