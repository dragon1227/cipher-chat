import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <form>
        <input
          className="mb"
          type="text"
          placeholder="Username"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <input
          className="mb"
          type="password"
          placeholder="Password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <input className="btn-dark" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
