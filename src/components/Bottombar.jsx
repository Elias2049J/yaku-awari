import { useState } from "react";
import "./Bottombar.css";

function Bottombar({ items }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="bottom-bar-container">
        <ul className="bottom-bar-list">
          {items.map((item, idx) => (
            <li
              key={item.label}
              className={`bottom-bar-item${active === idx ? " active" : ""}`}
              onClick={() => setActive(idx)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom-bar-content">
        {items[active]?.component}
      </div>
    </>
  );
}

export default Bottombar;