import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { MdAddToPhotos } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { logo } from "./assets/index.js"

const Todo = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(('todoList'))))
    const [inputValue, setInputValue] = useState(' ')
    const [isEdit, setIsEdit] = useState(false)
    const [checkValue, setcheckValue] = useState(null)

    const [selectedTodo, setselectedTodo] = useState(null)
    const inputRef = useRef(null)


    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))


    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()
        if (!inputValue) {
            console.log("hello")
            alert("please fill the data")
        } else if (inputValue && isEdit) {
            setTodos(todos.map((todo) => {
                if (todo.todoId === selectedTodo) {
                    return { ...todo, todo: inputValue }
                } else
                    return todo
            }))
            setInputValue('')
            setIsEdit(false)
        }
        else {
            setTodos([...todos, { todoId: uuidv4(), todo: inputValue, isCompleted: false }])
            setInputValue('')
        }
    }

    // delete todo
    const handleDelete = (todoId) => {
        const removeTodo = todos.filter(todo => todo.todoId !== todoId)
        setTodos(removeTodo)
    }

    const handleEdit = (id) => {
        const selectedTodo = todos.find(todo => todo.todoId === id)
        setInputValue(selectedTodo.todo)

        setselectedTodo(id)
        inputRef.current.focus()
        setIsEdit(true)

    }

    const removeAll = () => {
        if (todos && todos.length > 0) {
            console.log("hello")
            setTodos([])
        }
    }

    const handleChecked = (id) => {
        console.log(id)
        setTodos(todos.map((todo) => {
            if (todo.todoId === id) {
                console.log(todo.todoId)
                return { ...todo, isCompleted: !todo.isCompleted }
            } else
                return todo
        }))
    };



    return (
        <div className='bg-slate-900  flex justify-center items-center h-screen'>
            <div className=' h-4/5 bg-gray-200 w-96 rounded-md relative  overflow-y-auto	'>
                <h1 className=' text-center font-bold text-3xl mt-5 flex justify-center items-center gap-5 '><img src={logo} alt="logo" height={30} width={30} className='text-white ' /> Todo  </h1>

                <div className='flex px-1 justify-center items-center gap-1 mt-5'>
                    <input type="text" className='w-3/4 max-sm:full rounded-md h-7 px-2 focus:outline-none' placeholder='Add Todo...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} />

                    {isEdit ? <button className='rounded-lg  bg-sky-600 px-3 hover:bg-sky-700 py-1.5 text-white' onClick={addTodo} ><FaEdit /></button> : <button className='rounded-lg  bg-slate-800 hover:bg-slate-900 px-3 py-1.5 text-white' onClick={addTodo} ><MdAddToPhotos /></button>}
                </div>

                <div className=' text-center  mt-2 px-7' >
                    <button className='rounded-md max-sm:w-3/4 w-full bg-red-600  py-1  text-white  text-center hover:bg-red-700' onClick={removeAll}  >Remove All</button>
                </div>

                <div className='mt-5 px-1 '>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.todoId} className=' flex justify-between border-b border-gray-400 pb-1 mt-2'>
                                <div className=' flex gap-7 px-4'>

                                    <input type="checkbox" name="" id="" onChange={() => { handleChecked(todo.todoId) }} />

                                    <p className={todo.isCompleted ? 'line-through text-ellipsis overflow-hidden  max-w-28 text-gray-400' : 'text-ellipsis overflow-hidden  max-w-28'}>{todo.todo}   </p>
                                </div>

                                <div className='gap-4 flex px-4'>
                                    <button className='rounded-md max-sm:w-3/4 bg-sky-600 hover:bg-sky-700 px-3  text-white' onClick={() => handleEdit(todo.todoId)} ><FaEdit /></button>
                                    <button className='rounded-md max-sm:w-3/4 bg-red-600 hover:bg-red-700 px-3  text-white' onClick={() => handleDelete(todo.todoId)} ><MdDelete /></button>
                                </div>
                            </li>
                        ))}


                    </ul>

                </div>


            </div>

        </div>
    )
}

export default Todo