import BoardSizeContext from "components/context/BoardSizeContext";
import React, { useContext } from "react";
import "./header.scss";
import { AiOutlineClockCircle } from "react-icons/ai";

function Header({ clock }) {
  const width = useContext(BoardSizeContext);

  return (
    <div className="header" style={{ width: width }}>
      <div className="timer">
        <AiOutlineClockCircle size={30} />
        <h3>{clock}</h3>
      </div>
    </div>
  );
}

export default Header;