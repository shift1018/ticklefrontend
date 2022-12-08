import "./online.css";
import { Link } from "react-router-dom";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <Link
            to={"/profile/" + user.username}
            style={{ textDecoration: "none" }}
          >
            <img
              src={user.avatarURL || PF + "person/NoAvatar.png"}
              alt=""
              className="rightbarProfileImg"
            />
          </Link>
          {/* <span className="rightbarOnline"></span> */}
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
}
