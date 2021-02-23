import React from 'react';

function TodoList({ todos , toggleTodo , deleteTodo}){
    const todoList = todos.map( todos => {
        const label = todos.completed ? '作業中にする' : '完了にする';
    

        return (
            <li key = {todos.id}>
                {todos.title}
                <button onClick = { () => toggleTodo(todos.id , todos.completed)}>
                    {label}
                </button>
                <button onClick={ () => deleteTodo(todos.id)} >削除</button>
            </li>
        );
    });

    return <ul>{todoList}</ul>
}

export default TodoList;