import React, { Fragment, useState } from "react";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const [signup, setSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, username, email, password } = formData;
  const navigate = useNavigate();

  // API CALLS
  const signupUser = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { firstName, lastName, username, email, password };
      await API.post("api/v1/auth/signup", body, config);
      navigate("/dashboard/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { email, password };
      await API.post("api/v1/auth/login", body, config);
      navigate("/dashboard/profile");
    } catch (err) {
      console.log(err);
    }
  };

  // Functions

  const onSubmit = (e) => {
    e.preventDefault();
    signup ? signupUser() : loginUser();
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //CLASSES
  const signupClass = !signup
    ? "form-switcher__option"
    : "form-switcher__option form-switcher__option--selected";

  const loginClass = signup
    ? "form-switcher__option"
    : "form-switcher__option form-switcher__option--selected";

  const buttonText = signup ? "Signup" : "Login";

  return (
    <Fragment>
      <div className="form-switcher">
        <div
          className={loginClass}
          onClick={() => setSignup(false)}
        >
          Login
        </div>
        <div
          className={signupClass}
          onClick={() => setSignup(true)}
        >
          Signup
        </div>
      </div>
      <div className="login-form">
        <form
          className="login-form__group"
          onSubmit={onSubmit}
        >
          {signup && (
            <>
              <input
                className="input__text"
                type="text"
                placeholder="first name"
                name="firstName"
                value={firstName}
                onChange={onChange}
                required
                contentEditable="true"
              />
              <input
                className="input__text"
                type="text"
                placeholder="last name"
                name="lastName"
                value={lastName}
                onChange={onChange}
                required
              />
              <input
                className="input__text"
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </>
          )}
          <input
            className="input__text"
            type="email"
            placeholder="email address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            className="input__text"
            type="password"
            placeholder="password"
            name="password"
            minLength="8"
            value={password}
            onChange={onChange}
            required
          />
          <input
            className="input__submit"
            type="submit"
            value={buttonText}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Auth;
