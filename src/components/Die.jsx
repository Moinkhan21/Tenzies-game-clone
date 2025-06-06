import React from 'react'

const Die = (props) => {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return (
    <button 
        style={styles}
        onClick={props.holdDice}
        aria-pressed={props.isHeld}
        aria-label={`die with value ${props.value},
        ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
  )
}

export default Die