import React from "react"
import { useState } from "react"
import { signUp } from "../API/Auth"
import { toast } from 'react-hot-toast';
export default function Signupform({switchForm,user,setUser}){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Call the signUp function with the form values
      await signUp(username, password, email);
   
      toast.success("Signup Successful")

      setUser({...user,isLogIn:true})
    } catch (err) {

      toast.error("Signup Failed")
    
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center"></div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-1"
              placeholder="This will be your display name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
         
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <p>
            Already have an account? Sign In{" "}
            <span onClick={switchForm} style={{ color: "blue", cursor: "pointer" }}>
              here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}


