import React, { useEffect, useState, useCallback } from "react";
import GuessRow from "./GuessRow";

interface IWordleRowsProps {
  wordLength: number;
  secretWord: string;
}

const WordleRows: React.FC<IWordleRowsProps> = ({ wordLength, secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(wordLength).fill("")
  );
  const [playerGuesses, setPlayerGuesses] = useState<string[]>(
    Array(6).fill("")
  );
  const [activeRow, setActiveRow] = useState<number>(0);

  const submitUserGuess = useCallback(() => {
    const submittedGuess = currentGuess.join("");

    if (submittedGuess === secretWord) {
      console.log("WE GOT A WINNER");
    }

    setPlayerGuesses((prevState) => {
      const newState = [...prevState];
      newState[activeRow] = submittedGuess;

      return newState;
    });
    setCurrentGuess(Array(wordLength).fill(""));
    setActiveRow(activeRow + 1);
  }, [activeRow, currentGuess, wordLength, secretWord]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isAlphaChar = /^[A-Za-z]$/.test(event.key);

      setCurrentGuess((prevState: string[]) => {
        const newState = [...prevState];
        const lastIndex = prevState.findIndex((element) => element === "");

        if (lastIndex !== -1) {
          if (isAlphaChar) {
            newState[lastIndex] = event.key.toUpperCase();
          } else if (event.key === "Backspace") {
            newState[lastIndex - 1] = "";
          }
        } else if (event.key === "Backspace") {
          newState[prevState.length - 1] = "";
        } else if (event.key === "Enter") {
          submitUserGuess();
        }

        return newState;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submitUserGuess]);

  return (
    <div className="">
      {playerGuesses.map((guess: string, index: number) => {
        const valueToPass =
          activeRow === index ? currentGuess : guess.split("");

        return (
          <GuessRow
            rowNumber={index}
            activeRow={activeRow}
            currentGuess={valueToPass}
            wordLength={wordLength}
            isActive={activeRow === index}
            secretWord={secretWord}
            key={`guess_row_${index}`}
          />
        );
      })}
    </div>
  );
};

export default WordleRows;
