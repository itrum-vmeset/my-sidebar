import React, { useState } from "react";

function TestPage(): JSX.Element {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const onClickHandler = () => setVisible((prev) => !prev);

  return (
    <div style={{ display: "block" }}>
      <h1>TestPage</h1>
      {visible && <div data-testid="toggleBlock">visible</div>}
      <div>
        <button data-testid="toggleBtn" onClick={onClickHandler}>
          puCh
        </button>
      </div>
      <div>
        <textarea
          data-testid="textarea"
          placeholder="input text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TestPage;
