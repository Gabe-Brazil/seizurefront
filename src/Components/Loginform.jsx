import React from "react";
import { signIn } from "../API/Auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Loginform ({ switchForm, user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      // Call the signUp function with the form values
      await signIn(email, password);
      console.log("Sign in Successfull");
      toast.success("Login Successful");

      setUser({ ...user, isLogIn: true });
    } catch (err) {
      toast.error("Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
         {/* <p className="forgot-password text-right mt-2">
            Forgot password? ADD IN THE FUTURE
          </p> */}
          <p>
            Don't have an account Sign up{" "}
            <span onClick={switchForm} style={{ color: "blue" }}>
              here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Loginform;