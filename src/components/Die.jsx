// Importing the React library to create a functional component
import React from 'react'

// Die component receives props from its parent component
const Die = (props) => {

  // Define a dynamic style for the die (button) based on whether it's held or not
  const styles = {
    // If the die is held, use a green background; otherwise, use white
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  // Render a button representing a die
  return (
    <button 
      // Apply dynamic styling to indicate held state visually
      style={styles}

      // When the button is clicked, call the holdDice function passed as a prop
      onClick={props.holdDice}

      // Accessibility: This attribute tells assistive technologies (like screen readers)
      // whether the button is in a pressed (held) state or not
      aria-pressed={props.isHeld}

      // Accessibility: Provides a descriptive label for the button,
      // including its value and whether it is currently held or not
      aria-label={`die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    >
      {/* Display the numeric value of the die */}
      {props.value}
    </button>
  )
}

// Export the Die component so it can be imported and used in other files
export default Die
