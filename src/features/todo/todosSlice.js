import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        numTodos: 0
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            state.numTodos++;
        },
        setTodo: (state, action) => {
            state.todos.find(todo => todo.id === action.payload).finished = !state.todos.find(todo => todo.id === action.payload).finished;
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => action.payload !== todo.id);
            state.numTodos--;
        }
    }
});

export default todosSlice.reducer;
export const { addTodo, setTodo, deleteTodo } = todosSlice.actions;
export const selectTodos = state => state.todos.todos;
export const selectNumTodos = state => state.todos.numTodos;