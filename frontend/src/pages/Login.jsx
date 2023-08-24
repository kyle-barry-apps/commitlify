import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.email]: e.target.email,
  //     [e.target.password]: e.target.password,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="form-container">
        <h1 className="form-title">Login</h1>
        <p className="form-paragraph">Sign in with email and password</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            className="form-control"
            id="login-email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="login-password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-login" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
