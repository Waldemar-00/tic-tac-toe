import './App.css'   
import Square from './gameApp/GameApp'
import { useState } from 'react'
import {v4} from 'uuid'
function App() {
  const [num, setNum] = useState(3)
  const [array, setArray] = useState(() => {
    const array = []
    for (let i = 0; i < num; i++) {
      array.push(<Square key={v4()} />)
    }
    return array
  })
  function handleArray(e) {
    changeNum(e)
    setArray(array => {
      const arr = []
      for (let i = 0; i < 3; i++) {
        if (array.length === num) return [...array]
        arr.push(<Square key={v4()} />)
      }
      return [...array, ...arr]
    })
  }
  function changeNum(e) {
    setNum(e.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>TIC-TAC-TOE</h1>
        <label htmlFor='num'></label>
        <input id='num' type='number' step='3' min='3' max='12' onChange={ handleArray }/>
        <div>
          {array}
        </div>
        <div>
          {array}
        </div>
        <div>
          {array}
        </div>
      </header>
    </div>
  )   
}

export default App   
