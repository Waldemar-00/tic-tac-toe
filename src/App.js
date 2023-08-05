import './App.css'   
import Square from './gameApp/GameApp'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {v4} from 'uuid'
function App() {
  const [num, setNum] = useState(0) //? determined quantity of squares
  const [string, setString] = useState('') //? determined grid styles
  const [array, setArray] = useState([]) //? displays elements 
  const [square, setSquare] = useState([]) //? displays 'X' or 'O'
  const [isX, setIsX] = useState(true) // ? its flag of 'X' or 'O'
  const [winner, setWinner] = useState(null) //? print winner
  const [arrX, setArrX] = useState([]) //? for print history on display of 'X' steps
  const [arrO, setArrO] = useState([]) //? for print history on display of 'O' steps
  // const [historyBack, setHistoryBack] = useState([]) //? history the returning of steps
  const memo = useMemo(() => Array((num ** 2)).fill(null), [num]) //? layout of squares
  //! changeStyles
  const changeStyles = useCallback(() => {
    let str = ''
    for (let i = 0; i < num; i++) {
      str = str + '36px '
    }
    setString(str)
  }, [num])
  //! onSquareClick
  const onSquareClick = useCallback((i) => {
    if(square[i]) return
    isX ? setSquare(square => [ square[i] = 'X' ]) : setSquare(square => [ square[i] = 'O' ])
    // setHistoryBack([...square])
    setIsX(!isX)
    }, [isX, square]
  )
    //! handleArray
  const handleArray = useCallback(
    (history) => {
      changeStyles()
      const arr = []
      for (let i = 0; i < num ** 2; i++) {
        arr.push(<Square
                    key={v4()}
                    id={i}
                    value={history ? history[i] : square[i]} 
                    onSquareClick={() => onSquareClick(i)}
                    />)
      }
      setArray(arr)
    }, [num, changeStyles, square, onSquareClick])
  //! changeNum
  function changeNum(n) {
    setNum(num => num + n)
  }
  //! calcWinner
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
  //!  makeHistory
  const makeHistory = useCallback(
    (array = [...square]) => {
      const arX = array.map((item, index) => {
        return item === 'X' ? `step to square - ${index + 1}` : null
      })
      const arO = array.map((item, index) => {
        return item === 'O' ? `step to square - ${index + 1}` : null
      })
      setArrO(arO)
      setArrX(arX)
      handleArray(array)
    }, [handleArray, square]
  )
  //! returnHistory
  const returnHistory = useCallback((e) => {
    const array = square.slice()
    const index = e.target.innerHTML.match(/\d/g).join('') //!id
    const ar = array.slice(0, index)
    setSquare([...ar, ...Array(9 - index).fill(null)])
    makeHistory([...ar, ...Array(9 - index).fill(null)])
  }, [square, makeHistory])
  //! useEffect
  useEffect(() => {
    changeStyles()
    handleArray()
    setSquare(memo)
    calcWinner()
    makeHistory()
    // console.log(square, 'returnHistory')
  }, [num, handleArray, changeStyles, memo, calcWinner, makeHistory])
  //! RETURN
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
          {arrX.map((item) => <li key={v4()} onClick={(e) => returnHistory(e)}>{item}</li>)}
        </ul>
      </section>
      <section className='historyO'>
        <ul className="O">
          Stride of O player
          {arrO.map((item) => <li key={v4()}  onClick={(e) => returnHistory(e)}>{item}</li>)}
        </ul>
      </section>
      <footer> {winner ? <div>WINNER: {winner} </div> : null}</footer>
    </div>
  )   
}

export default App   
