import NumberButton from "./NumberButton";

export default function NumberKeyPanel() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="number-button-container flex">
      {numbers.map((num) => (
        <NumberButton buttonValue={num} />
      ))}
    </div>
  );
}
