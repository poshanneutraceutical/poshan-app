import api from "./api";

const TASK_URL = "/tasks";


// Create Task
export const createTask = async (data) => {

    const response = await api.post(
        TASK_URL,
        data
    );

    return response.data;
};
// Get tasks by department
export const getTasksByDepartment = async (
    department
) => {

    const response = await api.get(
        `${TASK_URL}/department/${department}`
    );

    return response.data;
};

// Get All Tasks
export const getTasks = async () => {

    const response = await api.get(
        `${TASK_URL}/`
    );

    return response.data;
};


// Get Task By Id
export const getTaskById = async (id) => {

    const response = await api.get(
        `${TASK_URL}/${id}`
    );

    return response.data;
};


// Update Task
export const updateTask = async (id, data) => {

    const response = await api.put(
        `${TASK_URL}/${id}`,
        data
    );

    return response.data;
};


// Delete Task
export const deleteTask = async (id) => {

    const response = await api.delete(
        `${TASK_URL}/${id}`
    );

    return response.data;
};