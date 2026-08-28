import { useParams } from "react-router-dom";
import profilePicture from "../assets/hero.png";

export default function Profile() {
  const { username } = useParams();

  return (
    <>
      <div className="flex items-center gap-4">
        <img
          src={profilePicture}
          alt="profile picture"
          className="h-13 w-13 rounded-full bg-white"
        />
        <h1 className="text-3xl dark:text-white">{username}</h1>
      </div>
    </>
  );
}
