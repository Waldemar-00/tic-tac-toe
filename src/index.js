import React from 'react'   
import ReactDOM from 'react-dom/client'   
import './index.css'   
import reportWebVitals from './reportWebVitals'  
import AppGame from './game/Game' 

const root = ReactDOM.createRoot(document.getElementById('root'))   
root.render(
  <React.StrictMode>
    <AppGame />
  </React.StrictMode>
)   
//Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)   
