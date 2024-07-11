import React from "react";

interface GuessRowProps {
  currentGuess: string[];
  wordLength: number;
  isActive: boolean;
  secretWord: string;
  rowNumber: number;
  activeRow: number;
}

const GuessRow: React.FC<GuessRowProps> = ({
  currentGuess,
  wordLength,
  isActive,
  secretWord,
  rowNumber,
  activeRow,
}) => {
  const isSubmitted =
    currentGuess.every((char) => char) && activeRow > rowNumber;

  const inputBlocks = Array.from({ length: wordLength }, (_, index) => {
    let isCorrectPosition = false;
    let isPresent = false;

    if (isSubmitted) {
      isCorrectPosition = currentGuess[index] === secretWord[index];

      if (!isCorrectPosition) {
        isPresent =
          secretWord.includes(currentGuess[index]) &&
          currentGuess.filter((char) => char == currentGuess[index]).length <=
            secretWord.split("").filter((char) => char == currentGuess[index])
              .length;
      }
    }

    return (
      <div
        className={`flex items-center justify-center rounded-lg w-16 h-16 p-2.5 uppercase font-bold text-2xl border text-white ${
          isSubmitted && "animate-scaleUp"
        }  ${
          isSubmitted && isCorrectPosition
            ? "bg-green-500"
            : isSubmitted && isPresent
            ? "bg-yellow-500"
            : isSubmitted
            ? "bg-red-500"
            : "bg-slate-700"
        }

        ${isActive ? "border-gray-300" : "border-gray-700"}`}
        key={`input_block_${index}`}
      >
        {currentGuess ? currentGuess[index] : ""}
      </div>
    );
  });

  return <div className="flex gap-4 mt-4">{inputBlocks}</div>;
};

export default GuessRow;
