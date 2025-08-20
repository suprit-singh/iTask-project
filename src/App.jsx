import { useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  

  const saveToLS = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleCheckbox = (e)=>{
    setshowFinished(!showFinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const handleEdit = (e, id) => {
    let t = todos.filter(item=>item.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id

    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id

    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    saveToLS()
    setTodo("")
    
  }
  const handleChange = (e) => {

    setTodo(e.target.value)
    
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  

  return (
    <>
      <Navbar />
      <div className=" container md:mx-auto my-5 py-5 px-9 bg-purple-200 rounded-xl min-h-[85vh] md:w-1/2">
      <div className="start text-center font-extrabold text-white text-3xl">iTask - Write what you wish</div>
        <div className="addtodo my-5">
          <h2 className='font-bold text-lg'>Add your work</h2>
          <div className='flex gap-3'>
          <input onChange={handleChange} value={todo} type="text" className="w-[90%] rounded-2xl px-2" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-500 my-2 rounded-xl text-white px-4 py-2 text-sm hover:bg-purple-600'>Save</button>
          </div>
        </div>
        <input className='mr-3' onChange={toggleCheckbox} type="checkbox" checked={showFinished} /><span className='font-medium'>Show finished</span> 
        <h2 className='font-bold text-xl my-2'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-3/4 justify-between my-2">
              <div className='flex gap-3'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-purple-500 rounded-md text-white px-3 py-1 mx-2 text-sm hover:bg-purple-600'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-purple-500 rounded-md text-white px-3 py-1 mx-2 text-sm hover:bg-purple-600'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
        
        

      </div>
      
    </>
  )
}

export default App
