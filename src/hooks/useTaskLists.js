import { useState, useEffect } from 'react';
import { fetchTaskLists } from '../services/taskListService';

export function useTaskLists() {
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTaskLists() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTaskLists(controller.signal);
        const mappedLists = data.slice(0, 10).map(list => ({
          id: list.listId,
          title: list.title,
          status: list.completed ? "completed" : "in-progress",
          items: []
        }));

        setTaskLists(mappedLists);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadTaskLists();

    return () => {
      controller.abort();
    };
  }, []);

  return { taskLists, setTaskLists, loading, error };
}