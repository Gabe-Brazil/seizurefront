import './App.css';
import { useEffect ,useState} from "react";
import {Route, Routes} from "react-router-dom";
import InputBoard from './Pages/InputBoard';
import NavbarComponent from './Components/NavComponent';
import Account from './Pages/Account'
import Statistics from "./Pages/Statistics"
import Auth from './Components/Auth';
import { Toaster } from "react-hot-toast"
import MedicationCalendar from './Pages/MedicationCalendar';

function App() {
  const [user,setUser]=useState({
    name:"",
    isLogIn:false
  }) 

  

 

  useEffect(()=>{
    if(window.localStorage.getItem("token")){
       ///connect to the server and check if the token is still valid
       
      setUser({...user,isLogIn:true})
      
    }

  }, [])

  return (
    <div className="App">



      <div><Toaster/></div>

      
      {user&& user.isLogIn && <NavbarComponent user={user} setUser={setUser}/>}

{user&& !user.isLogIn && <Auth user={user} setUser={setUser}/>}

{user && user.isLogIn&&
<Routes> 

<Route path="/" element={<InputBoard/>} > </Route>
<Route path="/stats" element={<Statistics />} > </Route>
<Route path="/acc" element={<Account/>} > </Route>
<Route path="/medication" element={<MedicationCalendar/>} > </Route>
</Routes>

// USE PARTICLE JS FOR BACKGROUNDS
}

    </div>
  );
}


export default App;
