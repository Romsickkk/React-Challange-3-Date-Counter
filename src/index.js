import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [stepsNum, setStepsNum] = useState(0);
  const [countNum, setCountNum] = useState(0);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    setNewDate();
  }, [countNum]);

  function countMinus() {
    setCountNum((c) => c - stepsNum - 1);
  }
  function countPlus() {
    setCountNum((c) => c + stepsNum + 1);
  }

  function setNewDate(sign) {
    const newDate = new Date(date);
    newDate.setDate(
      sign === "+" ? date.getDate() - countNum : date.getDate() + countNum
    );

    setDate(newDate);
    setMessage(showDate(date, newDate));
  }

  function showDate(oldDate, newDate) {
    const diffTime = newDate - oldDate;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (newDate > oldDate) {
      return `It will be in ${Math.abs(diffDays)} days: `;
    } else if (newDate < oldDate) {
      return `It was ${Math.abs(diffDays)} days ago: `;
    } else {
      return;
    }
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="box">
      <div className="step">
        <button onClick={stepsNum > 0 ? () => setStepsNum((s) => s - 1) : null}>
          -
        </button>
        <p>Step {stepsNum}</p>
        <button onClick={() => setStepsNum((s) => s + 1)}>+</button>
      </div>
      <div className="count">
        <button
          onClick={() => {
            countMinus();
            setNewDate("-");
          }}
        >
          -
        </button>
        <p>Count {countNum}</p>
        <button
          onClick={() => {
            countPlus();
            setNewDate("+");
          }}
        >
          +
        </button>
      </div>
      <div className="date">
        {message}
        {formattedDate}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
