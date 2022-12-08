import React from "react";
import "../post/post.css";

// --------------------CHANGE WHEN DEPLOYED------------!!!!!!!
const PF = "/assets/";
//const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const reactsArray = [
  {
    name: "like",
    image: `${PF}reactions/like.png`,
  },
  {
    name: "love",
    image: `${PF}reactions/love.png`,
  },
  {
    name: "haha",
    image: `${PF}reactions/haha.png`,
  },
  {
    name: "wow",
    image: `${PF}reactions/wow.png`,
  },
  {
    name: "sad",
    image: `${PF}reactions/sad.png`,
  },
  {
    name: "angry",
    image: `${PF}reactions/angry.png`,
  },
];

function ReactsPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div className="react" key={i}>
              <img
                src={react.image}
                alt="reaction-emoji"
                onClick={() => reactHandler(react.name)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ReactsPopup;
