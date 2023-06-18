import React from "react";
import DropdownPortal from "./DropdownPortal";

const ButtonDpopdownPortal: React.FC = () =>  {
  return (
    <div
      style={{
        width: "30vw",
        height: "30vh",
        background: "azure",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DropdownPortal options={["sdfds", "sdfsdf", "dfgsdffg"]} />
    </div>
  );
}

export default ButtonDpopdownPortal
