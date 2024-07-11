// import { useState, useEffect, useCallback } from "react";
import { useState, useEffect, useCallback } from "react";
import WordleRows from "./WordleRows";

interface ISecretWordState {
  word: string;
  charCount: number;
}

interface IGetWordProps {
  categoryWord: string;
}

const GetWord: React.FC<IGetWordProps> = ({ categoryWord }) => {
  const [secretWord, setSecretWord] = useState<ISecretWordState>({
    word: "",
    charCount: 0,
  });

  const fetchData = useCallback(async () => {
    const apiUrl = `https://api.datamuse.com/words?ml=${categoryWord}`;
    //   const apiUrl = `https://api.datamuse.com/words?ml=sport`;

    try {
      console.log("GetWord -> fetchData", categoryWord);
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const json = await res.json();
      const ranIndex = Math.floor(Math.random() * 100);

      setSecretWord({
        word: json[ranIndex].word.toUpperCase(),
        charCount: json[ranIndex].word.length,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  }, [categoryWord]);

  console.log("secretWord", secretWord);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex items-center justify-center mt-5 mx-auto">
        {secretWord.charCount && (
          <WordleRows
            wordLength={secretWord.charCount}
            secretWord={secretWord.word}
          />
        )}
      </div>
    </>
  );
};

export default GetWord;
