import { useState, useEffect } from "react";

const COLURS = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#00FF00" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Teal", hex: "#008080" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Gray", hex: "#808080" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Violet", hex: "#8F00FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Maroon", hex: "#800000" },
  { name: "Olive", hex: "#808000" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Coral", hex: "#FF7F50" },
];

export default function Guess() {
  const [solution, setSolution] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [coloursInOrder, setColoursInOrder] = useState(0);

  const [swapIndices, setSwapIndices] = useState({
    colour1: null,
    colour2: null,
  });

  const swapColors = (index) => {
    if (swapIndices.colour1 !== null) {
      setSwapIndices((prev) => ({
        ...prev,
        colour2: index,
      }));
      return;
    }
    setSwapIndices((prev) => ({
      ...prev,
      colour1: index,
    }));
  };

  const countOrder = () => {
    let counter = 0;
    guesses.forEach((guess, index) => {
      if (guess.hex === solution[index].hex) {
        counter++;
      }
    });
    setColoursInOrder(counter);
  };

  useEffect(() => {
    const randomColours = [...COLURS].sort(() => Math.random() - 0.5);
    const random10colours = randomColours.slice(0, 7);
    setSolution(random10colours);

    setGuesses([...random10colours].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    countOrder();
  }, [solution]);

  useEffect(() => {
    if (swapIndices.colour1 !== null && swapIndices.colour2 !== null) {
      let temp = [...guesses];
      const tempcolour = guesses[swapIndices.colour1];
      temp[swapIndices.colour1] = guesses[swapIndices.colour2];
      temp[swapIndices.colour2] = tempcolour;

      setGuesses(temp);
      setSwapIndices({ colour1: null, colour2: null });
    }
  }, [swapIndices]);

  return (
    <div className="w-fll flex flex-col items-center justify-center gap-20">
      <div className="w-full flex flex-wrap items-center justify-center gap-2">
        {guesses.map((guess, index) => (
          <button
            key={guess.hex}
            className={`rounded-full transition-all duration-300 ease-in-out
        ${
          index === swapIndices.colour1 || index === swapIndices.colour2
            ? "size-28"
            : "size-20"
        }`}
            style={{ backgroundColor: guess.hex }}
            onClick={() => swapColors(index)}
          ></button>
        ))}
      </div>

      <button
        className=" bg-white w-40 h-10 font-semibold rounded-md text-lg"
        onClick={countOrder}
      >
        Guess
      </button>
      <span className=" text-white font-black text-xl">
        In order: {coloursInOrder}
      </span>
    </div>
  );
}
