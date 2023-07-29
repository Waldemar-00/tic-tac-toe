import './App.css'   
import Square from './gameApp/GameApp'
import { useState } from 'react'
import {v4} from 'uuid'
function App() {
  const [num, setNum] = useState(3)
  const [string, setString] = useState('')
  const [array, setArray] = useState()
  function handleArray(n) {
    setNum(num => num + n)
    changeStyles()
    setArray(() => {
      const arr = []
      console.log(num)
      for (let i = 0; i < num ** 2; i++) {
        arr.push(<Square key={v4()} />)
      }
      return [...arr]
    })
  }
  function changeStyles() {
    console.log(num)
    let str = ''
    for (let i = 0; i < num; i++) {
      str = str + '36px '
    }
    setString(str)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>TIC-TAC-TOE</h1>
        <button className="btn" onClick={() => handleArray(3)}>more</button>
        <button className="btn" onClick={() => handleArray(-3)}>less</button>
      </header>
      <main className='wrap'>
        <div  className='grid' style={{gridTemplateRows: `${string}`, gridTemplateColumns: `${string}` }}>
          {array}
        </div>
      </main>
    </div>
  )   
}

export default App   
