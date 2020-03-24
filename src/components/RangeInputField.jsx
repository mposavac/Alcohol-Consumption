import React from "react";

export default function RangeInputField({
  input,
  handleInput,
  min,
  max,
  name,
  step,
  question
}) {
  let screen = window.innerWidth * 0.5 * 0.95 * 0.75 - 28;
  const translateIndicator = (input / max) * screen;

  return (
    <div className="range-input-container">
      <p>{question}</p>

      <div className="range">
        <span>{min + 1}</span>
        <span>{max + 1}</span>
      </div>
      <div className="range-slider">
        <input
          type="range"
          required
          name={name}
          min={min}
          max={max}
          step={step}
          onChange={handleInput}
          value={!input ? "0" : input}
        />
        <p
          className="indicator"
          style={{
            left: translateIndicator + "px"
          }}
        >
          {parseInt(input) + 1}
        </p>
      </div>
    </div>
  );
}
