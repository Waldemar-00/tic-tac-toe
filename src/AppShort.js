import './AppShort.css'
import Square from './gameApp/ShortGame'
import { useState, useEffect, useCallback } from 'react'
import { v4 } from 'uuid'
function App() {
  const [array, setArray] = useState([]) //? displays elements 
  const [square, setSquare] = useState(Array(9).fill(null)) //? displays 'X' or 'O'
  const [isX, setIsX] = useState(true) // ? its flag of 'X' or 'O'
  const [winner, setWinner] = useState(null) //? print winner
  const [arrX, setArrX] = useState([]) //? for print history on display of 'X' steps
  const [arrO, setArrO] = useState([]) //? for print history on display of 'O' steps
  const [back, setBack] = useState([]) //? for print history on display 

  //! onSquareClick
  const onSquareClick = useCallback((i) => {
    if (square[i]) return
    isX ? setSquare(square => [...square, square[i] = 'X']) : setSquare(square => [...square, square[i] = 'O'])
    setIsX(!isX)
  }, [isX, square]
  )
  //! handleArray
  const handleArray = useCallback(
    (array = [...square]) => {
      if(back.length > 0) array = [...back]
      const arr = []
      for (let i = 0; i < 9; i++) {
        arr.push(<Square
          key={v4()}
          value={array[i]}
          onSquareClick={() => onSquareClick(i)}
        />)
      }
      setArray(arr)
    }, [square, onSquareClick, back])
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
        return setWinner(square[a])
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
    makeHistory([...ar, ...Array(9 - index).fill(null)])
    setBack([...ar, ...Array(9 - index).fill(null)])
  }, [square, makeHistory])
  //! useEffect
  useEffect(() => {
    handleArray()
    calcWinner()
    makeHistory()
  }, [handleArray, calcWinner, makeHistory ])
  //! RETURN
  return (
    <div className="App">
      <header className="App-header">
        <h1>TIC-TAC-TOE</h1>
        <button className="btn">BUTTON</button>
        <button className="btn">BUTTON</button>
      </header>
      <main className='wrap'>
        <div className='grid'>
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
          {arrO.map((item) => <li key={v4()} onClick={(e) => returnHistory(e)}>{item}</li>)}
        </ul>
      </section>
      <footer> {winner ? <div>WINNER: {winner} </div> : null}</footer>
    </div>
  )
}

export default App   
