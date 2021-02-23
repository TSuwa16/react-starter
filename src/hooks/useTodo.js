import {useState,useEffect} from 'react';
import todoService from '../services/todos';

//TodoのStateと更新ロジックを持つフック
export default function useTodo(){
    //TodoのStateとtodosを更新する関数
    const [todos , setTodos] = useState([]);

    //このカスタムフックを利用しているコンポーネントがマウントされたらToDoを取得
    useEffect(() => {
        todoService.getAll().then(todos => {
            //最後に追加したものから先頭に表示させたいため、取得したTodoの配列を反転
            setTodos(todos.reverse());
        });
    } , []);

    //IDが一致したTodoの状態（作業中/完了）を更新する
    const toggleTodo = (id , completed) => {
        const todo = todos.find( todo => todo.id === id );
        const newTodo = { ...todo , completed : !completed};

        //更新が成功したらstateを更新
        todoService.update(id , newTodo).then(updatedTodo => {
            const newTodos = todos.map(todo => 
                todo.id !== updatedTodo.id ? todo : updatedTodo);
                setTodos(newTodos);
        });
    };

    const deleteTodo = id => {
        //削除が成功したらstateを更新する
        todoService.delete(id).then(deleteTodoId => {
            const newTodos = todos.filter(todo => todo.id !== deleteTodoId);
            setTodos(newTodos);
        });
    }
    
    return { todos , toggleTodo , deleteTodo }
}