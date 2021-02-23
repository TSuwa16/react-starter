import axios from 'axios';

const baseUrl = 'http://localhost:3001/todos';

//Todoを取得する
const getAll = async() => {
    const response = await axios.get(baseUrl);
    return response.data;
};

//ToDoを更新する
const update = async (id , newTodo) =>{
    const response = await axios.put(`${baseUrl}/${id}` , newTodo);
    //更新後、Todoを返却
    return response.data;
};

//ToDoを削除する
const _delete = async id => {
    await axios.delete(`${baseUrl}/${id}`);
    
    //削除後、ToDoを返却
    return id ;
}

export default { getAll , update , delete : _delete };
