import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import OverlayComponent from "./components/overlay";

const words = [
  { word: "elephant", category: "Animal" },
  { word: "pineapple", category: "Fruit" },
  { word: "guitar", category: "Musical Instrument" },
  { word: "astronaut", category: "Occupation" },
  { word: "volleyball", category: "Sport" },
  { word: "pyramid", category: "Historical Landmark" },
  { word: "kangaroo", category: "Animal" },
  { word: "strawberry", category: "Fruit" },
  { word: "violin", category: "Musical Instrument" },
  { word: "scientist", category: "Occupation" },
  { word: "basketball", category: "Sport" },
  { word: "penguin", category: "Animal" },
  { word: "watermelon", category: "Fruit" },
  { word: "piano", category: "Musical Instrument" },
  { word: "engineer", category: "Occupation" },
  { word: "soccer", category: "Sport" },
  { word: "colosseum", category: "Historical Landmark" },
  { word: "dolphin", category: "Animal" },
  { word: "blueberry", category: "Fruit" },
  { word: "drums", category: "Musical Instrument" },
  { word: "teacher", category: "Occupation" },
  { word: "tennis", category: "Sport" },
  { word: "giraffe", category: "Animal" },
  { word: "raspberry", category: "Fruit" },
  { word: "flute", category: "Musical Instrument" },
  { word: "chef", category: "Occupation" },
  { word: "cricket", category: "Sport" },
];

const hangmanImages = [
  `${import.meta.env.BASE_URL}imgs/hangman1.png`,
  `${import.meta.env.BASE_URL}imgs/hangman2.png`,
  `${import.meta.env.BASE_URL}imgs/hangman3.png`,
  `${import.meta.env.BASE_URL}imgs/hangman4.png`,
  `${import.meta.env.BASE_URL}imgs/hangman5.png`,
  `${import.meta.env.BASE_URL}imgs/hangman6.png`,
  `${import.meta.env.BASE_URL}imgs/hangman7.png`,
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getKeyboardCharacters() {
  const chars = [];

  for (let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i));
  }
  return chars;
}

function App() {
  const [characters, setCharacters] = useState<{
    arr: string[];
    category: string;
  }>({
    arr: words[0].word.toUpperCase().split(""),
    category: words[0].category,
  });
  const [usedCharacters, setUsedCharacters] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [errors, setErrors] = useState<number>(6);
  const [hangman, setHangman] = useState<number>(0);

  const onClickChar = useCallback(
    (char: string) => {
      setUsedCharacters((prev) => [...prev, char as never]);

      if (!characters.arr.includes(char)) {
        setHangman(hangman + 1);
        setErrors(errors + 1);
      }
    },
    [characters, errors, hangman]
  );

  const isCharAlreadyUsed = useCallback(
    (char: never) => usedCharacters.includes(char),
    [usedCharacters]
  );

  const display = useMemo(
    () =>
      characters.arr.map((char) =>
        usedCharacters.includes(char as never) ? char : "_"
      ),
    [characters, usedCharacters]
  );

  const reset = useCallback(() => {
    setErrors(0);
    setUsedCharacters([]);
    setHangman(0);

    const integer = getRandomInt(words.length);

    setCharacters({
      arr: words[integer].word.toUpperCase().split(""),
      category: words[integer].category,
    });
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const index = getRandomInt(words.length);
    setCharacters({
      arr: words[index].word.toUpperCase().split(""),
      category: words[index].category,
    });
  }, []);

  useEffect(() => {
    if (errors === 6) {
      setIsWin(false);
      setIsVisible(true);
    }
  }, [errors]);

  useEffect(() => {
    console.log(characters, display);
    if (!display.includes("_")) {
      setIsWin(true);
      setIsVisible(true);
    }
  }, [characters, display]);

  return (
    <div className="container">
      <div className="title">Hangman Game</div>
      <div className="content">
        <div className="img-container">
          <img src={hangmanImages[hangman]} alt="hangman" />
        </div>

        <div className="used-chars-container" style={{ marginBottom: 50 }}>
          Used Characters: {usedCharacters.join(", ")}
          <br />
          Category: {characters.category}
        </div>

        <div className="display-container">
          {display.map((char, index) => (
            <div key={index} className="char-container">
              <div className="char-text">{char === "_" ? "" : char}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="keyboard-container">
        {getKeyboardCharacters().map((char, index) => (
          <button
            className="keyboard-char-container"
            disabled={isCharAlreadyUsed(char as never)}
            key={index}
            onClick={() => onClickChar(char)}
          >
            {char}
          </button>
        ))}
      </div>
      <OverlayComponent isVisible={isVisible} isWin={isWin} resetGame={reset} />
    </div>
  );
}

export default App;
