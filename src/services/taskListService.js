import axios from "axios";

/**
 * Fetches task lists from JSONPlaceholder API
 * @param {AbortSignal} [signal] - Optional abort signal to cancel the request
 * @returns {Promise<Array<{listId: number, title: string, completed: boolean, tasks: Array}>>}
 * @throws {Error} When network request fails
 */

export async function fetchTaskLists(signal) {
    if (signal && !(signal instanceof AbortSignal)) {
        throw new TypeError('signal must be an AbortSignal instance');
    }
    try {
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
    } catch (error) {
    console.error('Failed to fetch task lists:', error.message);
    throw new Error(`Task list fetch failed: ${error.message}`, { cause: error });
    }
}
