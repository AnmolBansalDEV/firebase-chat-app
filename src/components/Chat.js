import { useEffect, useState } from "react"
import { auth, db } from "../firebase-config"
import { collection, serverTimestamp, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore"


export const Chat = ({room})=>{
    
    const [newMessage, setNewMessage] = useState("")
    const messageRef = collection(db, "messages")
    const [messageArr, setMessageArr] = useState([])
    const handleSubmit = async(e)=>{
        e.preventDefault()

        await addDoc(messageRef, {
            user: auth.currentUser.displayName,
            message: newMessage,
            time: serverTimestamp(),
            room
        });
        setNewMessage("")
    }

    useEffect(()=>{
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("time"))
        const unsubscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = []
            snapshot.forEach(
                (doc)=> messages.push({...doc.data(), id: doc.id})
            )
            setMessageArr(messages)
        }
        )
        return ()=> unsubscribe()
    }
    ,[])

    return (
        <div>
            <div>
                {messageArr.map((x) => (
                <div key={x.id}>
                    <h4>{x.user}: <span style={{"font-weight": "400"}}>{x.message}</span></h4>
                </div>))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="enter your message..."
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage} />
                <button>send</button>
            </form>
        </div>
    )
}