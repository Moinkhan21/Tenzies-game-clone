import React, { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Main = () => {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null); 

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // if(
  //   dice.every(die => die.isHeld) &&
  //   dice.every(die => die.value === dice[0].value)
  // ) {
  //   console.log("You won!")
  // }
  
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus(); // Focus the button when the game is won
    }
  }, [gameWon]); // Dependency array to run effect when gameWon changes

  function generateAllNewDice() {
    // const newDice = []
    // for (let i = 0; i < 10; i++) {
    //     newDice.push(Math.floor(Math.random() * 6) + 1);

    //     OR

    //     const rand = Math.ceil(Math.random() * 6);
    //     newDice.push(rand);

    // }
    // return newDice

    //OR

    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

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

  function holdDice(id) {
    console.log(id);
    // setDice(prevDice => prevDice.map(die => {
    //   return die.id === id ? {...die, isHeld: !die.isHeld} : die
    // }))

    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      holdDice={() => holdDice(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div arial-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press
          "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>

      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default Main;
