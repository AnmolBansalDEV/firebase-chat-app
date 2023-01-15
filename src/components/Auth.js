import {auth, provider} from '../firebase-config'

import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const Auth = ({setIsAuth}) =>{

    const signInWithGoogle = async()=>{
        try{
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(result.user.refreshToken)
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle}>Sign in</button>
        </div>
    )
}