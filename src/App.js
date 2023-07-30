import './App.css'   
import Square from './gameApp/GameApp'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {v4} from 'uuid'
function App() {
  const [num, setNum] = useState(0)
  const [string, setString] = useState('')
  const [array, setArray] = useState([])
  const [square, setSquare] = useState([])
  const [isX, setIsX] = useState(true)
  const memo = useMemo(() => Array((num ** 2)).fill(null), [num])
  const changeStyles = useCallback(() => {
    let str = ''
    for (let i = 0; i < num; i++) {
      str = str + '36px '
    }
    setString(str)
  }, [num])
  const onSquareClick = useCallback((i) => {
    if(square[i]) return
    isX ? setSquare(square => [...square, square[i] = 'X']) : setSquare(square => [...square, square[i] = 'O'])
    setIsX(!isX)
    }, [isX, square]
  )
  const handleArray = useCallback(() => {
    changeStyles()
    const arr = []
    for (let i = 0; i < num ** 2; i++) {
      arr.push(<Square
                  key={v4()}
                  value={square[i]} 
                  onSquareClick={() => onSquareClick(i)}
                  />)
    }
    setArray(arr)
  }, [num, changeStyles, square, onSquareClick])
  function changeNum(n) {
    setNum(num => num + n)
  }
  useEffect(() => {
    handleArray()
    changeStyles()
    setSquare(memo)
    console.log(square)
  }, [num, handleArray, changeStyles, square, memo])
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
