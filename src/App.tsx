import { FormEvent, useRef, useState } from "react"
import useTodoStore, { todo } from "./store/store"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

function App() {
  const [view, setView] = useState(true)
  const { todos, addTodo, removeTodo } = useTodoStore()
  const formRef = useRef<HTMLFormElement>(null)
  const [parent] = useAutoAnimate()
  const [parent2] = useAutoAnimate()

  const form = formRef?.current

  const createTodo = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(form!)
    const todo: todo = {
      name: formData.get('name') as string,
      info: formData.get('info') as string,
      date: new Date(formData.get('date') as string),
    }
    addTodo(todo)
    form?.reset()
  }

  console.log(todos)

  return (
    <main className="min-h-screen flex flex-col p-5 gap-10">
      <h2 className="text-3xl">Add todo</h2>
      <section className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Touch to display form
        </div>
        <form onSubmit={createTodo} ref={formRef} className="collapse-content flex flex-col gap-5">
          <input type="text" name="name" className="input input-bordered" placeholder="Todo name" />
          <input type="text" name="info" className="input input-bordered" placeholder="Todo info" />
          <input type="date" name="date" className="input input-bordered w-full" placeholder="Todo date" />
          <button type="submit" className="btn btn-accent">Create todo</button>
        </form>
      </section>

      <hr />
      <div className="flex justify-center items-center gap-10">
        <h2 className="text-3xl">Change view</h2>
        <button className="btn btn-square btn-accent btn-lg text-3xl" onClick={() => setView(!view)}>
          {view ? <IoGrid /> : <FaList />}
        </button>
      </div>

      <section ref={parent2}>
        {view && <article>
          <h2 className="text-3xl">Grid view</h2>
          <section className="grid lg:grid-cols-4 sm:grid-cols-2 p-5 gap-5" ref={parent}>
            {todos.length !== 0 && todos.map((todo: todo) => (
              <div key={todo.name} className="flex flex-col justify-between border-2 rounded-xl gap-2 p-3 text-xl">
                <h3>Name: {todo.name}</h3>
                <p>Info: {todo.info}</p>
                <p>Due: {new Date(todo.date).toDateString()}</p>
                <button type="button" className="btn btn-accent text-lg" onClick={() => removeTodo(todo)}>Erase todo</button>
              </div>
            ))}
          </section>
        </article>}

        {!view && <article>
          <h2 className="text-3xl">List view</h2>
          <ul className="flex flex-col p-5 gap-5" ref={parent}>
            {todos.length !== 0 && todos.map((todo: todo) => (
              <li key={todo.name} className="border-2 rounded-xl gap-2 p-3 text-xl list-item list-disc">
                <h3 className="mb-2">Name: {todo.name}</h3>
                <p className="mb-2">Info: {todo.info}</p>
                <p className="mb-2">Due: {new Date(todo.date).toDateString()}</p>
                <button type="button" className="btn btn-accent text-lg" onClick={() => removeTodo(todo)}>Erase todo</button>
              </li>
            ))}
          </ul>
        </article>}
      </section>
    </main>
  )
}

export default App
