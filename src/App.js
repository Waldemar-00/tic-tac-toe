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
  const [winner, setWinner] = useState(null)
  const [arrX, setArrX] = useState([])
  const [arrO, setArrO] = useState([])
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
  const calcWinner = useCallback(() => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (square[a] === square[b] && square[b] === square[c]) {
        return  setWinner(square[a])
      }
    }
    return null
  }, [square])
  const makeHistoryX = useCallback(
    () => {
      const array = square.slice()
      const ar = array.map((item, index) => {
        return item === 'X' ? `step to square - ${index + 1}` : null
      })
      setArrX(ar)
    }, [square]
  )
  const makeHistoryO = useCallback(
  () => {
    const array = square.slice()
    const ar = array.map((item, index) => {
      return item === 'O' ? `step to square - ${index + 1}` : null
    })
    setArrO(ar)
  }, [square]
)
  useEffect(() => {
    handleArray()
    changeStyles()
    setSquare(memo)
    calcWinner()
    makeHistoryX()
    makeHistoryO()
  }, [num, handleArray, changeStyles, square, memo, calcWinner, makeHistoryX, makeHistoryO])
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
      <section className='historyX'>
        <ul className="X">
          Stride of X player
          {arrX.map((item) => <li key={v4()}>{item}</li>)}
        </ul>
      </section>
      <section className='historyO'>
        <ul className="O">
          Stride of O player
          {arrO.map((item) => <li key={v4()}>{item}</li>)}
        </ul>
      </section>
      <footer> {winner ? <div>WINNER: {winner} </div> : null}</footer>
    </div>
  )   
}

export default App   
