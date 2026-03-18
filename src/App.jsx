import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar/> 
      <main className="main-content">
        <div className="todo-container">
          <h1 className="app-title">iTask - Manage your todos</h1>
          
          <div className="add-todo-section">
            <h2 className="section-title">Add a Todo</h2>
            <div className="input-group">
              <input 
                onChange={handleChange} 
                value={todo} 
                type="text" 
                className="todo-input" 
                placeholder="What needs to be done?"
              />
              <button 
                onClick={handleAdd} 
                disabled={todo.length<=3} 
                className="btn-primary"
              >
                Save
              </button>
            </div>
          </div>
          
          <div className="filter-section">
            <input 
              className="custom-checkbox" 
              id="show" 
              onChange={toggleFinished} 
              type="checkbox" 
              checked={showFinished} 
            /> 
            <label className="filter-label" htmlFor="show">Show Finished</label> 
          </div>
          
          <div className="divider"></div>
          
          <h2 className="section-title">Your Todos</h2>
          
          <div className="todos-list">
            {todos.length === 0 && <div className="empty-state">No Todos to display</div> }
            
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo-item">
                  <div className="todo-content"> 
                    <input 
                      name={item.id} 
                      onChange={handleCheckbox} 
                      type="checkbox" 
                      className="custom-checkbox"
                      checked={item.isCompleted} 
                      id="" 
                    />
                    <div className={"todo-text " + (item.isCompleted ? "completed" : "")}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="todo-actions">
                    <button 
                      onClick={(e)=>handleEdit(e, item.id)} 
                      className="btn-icon btn-edit"
                      aria-label="Edit todo"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={(e)=>{handleDelete(e, item.id)}} 
                      className="btn-icon btn-delete"
                      aria-label="Delete todo"
                    >
                      <AiFillDelete />
                    </button>
                  </div> 
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default App