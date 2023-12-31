import './Game.css'
import { useState } from 'react'
import { v4 } from 'uuid'
function AppGame() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const x = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  function onStep(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] 
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  function onJumpHistory(moveIndex) {
    setCurrentMove(moveIndex)
  }
  const movies = history.map((squares, index) => {
    let description = ''
    index > 0 ? description = `step to square - ${index}` : description = 'Go to game start!'
    return (
      <li style={{ marginTop: '10px'}} key={v4()} onClick={() => onJumpHistory(index)}>{description}</li>
    )
  })
  return (
    <>
      <Game x={x} currentSquares={currentSquares} onStep={onStep}/>
      <section className='historyX'>
        <ul className="X">
          Stride of players
          {movies}
        </ul>
      </section>
      <section className='historyO'>
        <ul className="O">
          Stride of players
          {movies}
        </ul>
      </section>
    </>
  )
}
function Game({ onStep, x, currentSquares }) {
  function Square({value, onSquareClick}) {
    return  <button
              className='fields'
              onClick={onSquareClick}
              >
              {value}
            </button>
  }
  function onSquareClick(i) {
    const array = currentSquares.slice()
    if (array[i] || winner(currentSquares))return
    x ? array[i] = 'X' : array[i] = 'O'
    onStep(array)
  }
  const win = winner(currentSquares)
  return (
    <main className='App'>
      <header className="App-header">
        <h1>TIC-TAC-TOE</h1>
        {win ? <div className='win'>WINNER: {win} </div> : <div className='next'> Next step: {x ? 'X' : 'O'} </div>}
      </header>
    <section className='Game'>
      <div className=' grid'>
        <Square key={v4()} value={currentSquares[0]} onSquareClick={() => onSquareClick(0)}/>
        <Square key={v4()} value={currentSquares[1]} onSquareClick={() => onSquareClick(1)}/>
        <Square key={v4()} value={currentSquares[2]} onSquareClick={() => onSquareClick(2)}/>
        <Square key={v4()} value={currentSquares[3]} onSquareClick={() => onSquareClick(3)}/>
        <Square key={v4()} value={currentSquares[4]} onSquareClick={() => onSquareClick(4)}/>
        <Square key={v4()} value={currentSquares[5]} onSquareClick={() => onSquareClick(5)}/>
        <Square key={v4()} value={currentSquares[6]} onSquareClick={() => onSquareClick(6)}/>
        <Square key={v4()} value={currentSquares[7]} onSquareClick={() => onSquareClick(7)}/>
        <Square key={v4()} value={currentSquares[8]} onSquareClick={() => onSquareClick(8)}/>
      </div>
      </section>
      <footer> {win ? <div>WINNER: {win} </div> : null}</footer>
    </main>
  )
  function winner() {
    const array = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < array.length; i++) {
      const [a, b, c] = array[i]
      if (currentSquares[a] &&
          currentSquares[a] === currentSquares[b] &&
          currentSquares[a] === currentSquares[c]) {
            return currentSquares[a]
      }
    }
    return null
  }
}
export default AppGame