import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [nat, setNat] = useState("uzbek")
  const [desc, setDesc] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(data);
  }, []);

  function handleClick(e) {
    e.preventDefault();

    if (!name.trim() || age <= 0 || !desc.trim()) {
      if (!name.trim()) {
        alert("Please enter your name correctly!");
      }
      if (age <= 0) {
        alert("Age must be entered!");
      }
      if (!desc.trim()) {
        alert("Please enter information about yourself...");
      }
      return;
    }

    if (/\d/.test(name)) {
      alert("The name cannot contain a number!");
      return;
    }

    const obj = {
      id: Date.now(),
      name: name,
      age: age,
      nationality: nat,
      desc: desc
    }
    let updatedTodos = [...todos, obj];
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos);
    setName('');
    setAge(0);
    setNat("uzbek");
    setDesc('');
  }

  function handleDelete(item) {
    let isDelete = confirm("Are you sure you want to delete this information?")
    if (isDelete) {
      let copiedTodos = [...todos];
      let filteredTodos = copiedTodos.filter(el => el.id !== item.id);
      setTodos(filteredTodos);
      localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }
  }


  return (
    <>
      <div id="container">
        <div id="wrapper-header">
          <div className='logo'>
            <a href="#">Data Saver</a>
          </div>
          <div className='menus'>
            <a href="#">Home</a>
            <a href="#">Contact</a>
            <a href="#">Menu</a>
            <a href="#">Product</a>
            <button>Login</button>
          </div>
        </div >

        <div className="block">
          <div>
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='name' placeholder='Please enter your name...' />
              <label htmlFor="age">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} id='age' placeholder='Please enter your age...' />
              <label htmlFor="nat">Nationality</label>
              <select value={nat} onChange={(e) => setNat(e.target.value)} id="nat">
                <option value="uzbek">Uzbek</option>
                <option value="russian">Russian</option>
                <option value="english">English</option>
                <option value="tadjik">Tadjik</option>
                <option value="kyrgyz">Kyrgyz</option>
              </select>

              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} cols="30" rows="10" placeholder='Please write information about yourself...'></textarea>
              <button onClick={handleClick}>Save</button>
            </form>
          </div>

          <table className="wrapper-person">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Age</th>
                <th>Nationality</th>
                <th>+ -</th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.age}</td>
                      <td>{el.nationality}</td>
                      <td id="scroll">
                        <span id='edit'><i className="fa-regular fa-pen-to-square"></i></span><span id='delete' onClick={() => handleDelete(el)}><i className="fa-regular fa-trash-can"></i></span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
