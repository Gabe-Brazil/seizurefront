import { useState } from "react"
import Signupform from "./Signupform"
import Loginform from "./Loginform"
function Auth({user,setUser}){
const [logIn,setLogIn]=useState(true)

const switchForm=()=>{
    setLogIn(!logIn)
}

if(logIn){

   return <Loginform user={user} setUser={setUser} switchForm={switchForm} />
}else{
   return <Signupform user={user} setUser={setUser} switchForm={switchForm} />
}



}

export default Auth