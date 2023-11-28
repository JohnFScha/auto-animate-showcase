import { create } from 'zustand'

export interface todo {
  name: string 
  info: string
  date: Date
}

interface TodoState {
  todos: todo[]
  addTodo: (todo: todo) => void
  removeTodo: (todo: todo) => void
}

const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({todos: [...state.todos, todo]})),
  removeTodo: (todo) => set((state) => ({todos: state.todos.filter((t) => t !== todo)}))
}))

export default useTodoStore