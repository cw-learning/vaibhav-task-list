import axios from "axios";


export async function fetchTaskLists(signal) {
    try{
        const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
        { signal }
    );
    return response.data.map(todo => ({
        listId: todo.id,
        title: todo.title,
        completed: todo.completed,
        tasks: [] // empty initially, editable later
    }));
    }catch(error){
        console.error('Failed:', error);
        throw error;
    }
}
