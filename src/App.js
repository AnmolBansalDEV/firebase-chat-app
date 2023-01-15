import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomRef = useRef(null)

  const enterRoom = (e) => {
    e.preventDefault()
    console.log(roomRef)
    setRoom(roomRef.current.value)  
  }
  const handleSignOut = async ()=>{
      await signOut(auth)
      setIsAuth(false)
      setRoom(null)
  }

  if (!isAuth) {
    return (
      <div className="app">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
        {
          room ? (
            <Chat room={room} />
          ):
          (<div>
            <h1>Enter the Room No</h1>
            <form>
              <input ref={roomRef} />
              <button onClick={enterRoom}>enter room</button>
            </form>
          </div>)
        }
        <button onClick={handleSignOut}>sign out</button>
    </div>
  )
}

export default App;
