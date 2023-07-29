import './App.css'   
import Square from './gameApp/GameApp'
import { useState, useEffect, useCallback } from 'react'
import {v4} from 'uuid'
function App() {
  const [num, setNum] = useState(0)
  const [string, setString] = useState('')
  const [array, setArray] = useState([])
  const changeStyles = useCallback(() => {
    let str = ''
    for (let i = 0; i < num; i++) {
      str = str + '36px '
    }
    setString(str)
  }, [num])
  const handleArray = useCallback((n) => {
    changeStyles()
    const arr = []
    for (let i = 0; i < num ** 2; i++) {
      arr.push(<Square key={v4()} />)
    }
    setArray(arr)
  }, [num, changeStyles])
  function changeNum(n) {
    setNum(num => num + n)
  }
  useEffect(() => {
    handleArray()
    changeStyles()
  }, [num, handleArray, changeStyles])
  return (
    <div className="App">
      <header className="App-header">
        <h1>TIC-TAC-TOE</h1>
        <button className="btn" onClick={() => changeNum(3)}>more</button>
        <button className="btn" onClick={() => changeNum(-3)}>less</button>
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
