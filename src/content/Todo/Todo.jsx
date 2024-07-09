import { useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { NewTodoForm } from './NewTodoForm';
import style from './style/Todo.module.css'

export function Todo() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])

    function addTodo(title) {
        setTodos(currentTodos => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, completed: false },
            ]
        })
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }

                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }


    return (
        <div className={style.container}>
            <div className={style.border}>
                <h1 className={style.header}>Todo List</h1>
                <div className={style.line} />
                <NewTodoForm onSubmit={addTodo} />
                <TodoList todos={todos}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    )
}