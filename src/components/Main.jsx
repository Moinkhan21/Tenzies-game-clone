// Import React core functionality and necessary hooks
import React, { useEffect, useRef, useState } from "react";

// Import the Die component (each individual die)
import Die from "./Die";

// Import nanoid to generate unique IDs for each die
import { nanoid } from "nanoid";

// Import Confetti component to show winning celebration
import Confetti from "react-confetti";

const Main = () => {
  // Initialize state for 10 dice using generateAllNewDice function
  const [dice, setDice] = useState(() => generateAllNewDice());

  // useRef to programmatically set focus to the roll button when game is won
  const buttonRef = useRef(null); 

  // Check if the game is won:
  // - All dice are held (user has clicked to hold them)
  // - All dice have the same value
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // useEffect triggers when `gameWon` changes
  // If the game is won, set focus to the button (for accessibility/UX)
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  // Function to generate an array of 10 new dice objects
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6), // Random value between 1 and 6
      isHeld: false,                       // Default state: not held
      id: nanoid(),                        // Unique ID for each die
    }));
  }

  // Function to roll dice
  // - If the game is not yet won, update only unheld dice with new values
  // - If the game is won, reset the game with all new dice
  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  // Function to toggle the `isHeld` state of a die when clicked
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // Create an array of Die components using the current `dice` state
  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}                        // Unique key for rendering optimization
      value={dieObj.value}                   // Value shown on the die
      isHeld={dieObj.isHeld}                 // Whether the die is held
      holdDice={() => holdDice(dieObj.id)}   // Function to toggle hold state
    />
  ));

  return (
    <main>
      {/* Show confetti animation if the game is won */}
      {gameWon && <Confetti />}

      {/* Screen reader only message for visually impaired users */}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      {/* Game title and instructions */}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      {/* Display all die components */}
      <div className="dice-container">{diceElements}</div>

      {/* Roll or New Game button, ref used to set focus on win */}
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default Main;
