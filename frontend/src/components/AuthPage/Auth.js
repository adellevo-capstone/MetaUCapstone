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
      <div className="auth-forms">
        <div className="form-switcher">
          <div
            className={loginClass}
            onClick={() => setSignup(false)}
          >
            Login
          </div>
          <div className="divider" />
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
            <div className="auth-form-header">
              <h1 className="auth-logo">tangerine</h1>
              <p>Event planning, made simple and sweet.</p>
            </div>

            {signup && (
              <>
                <div className="name-fields">
                  <div className="form-field">
                    <p>First name</p>
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
                  </div>
                  <div className="form-field">
                    <p>Last name</p>
                    <input
                      className="input__text"
                      type="text"
                      placeholder="last name"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <p>Username</p>
                  <input
                    className="input__text"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="form-field">
              <p>Email</p>
              <input
                className="input__text"
                type="email"
                placeholder="email address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-field">
              <p>Password</p>
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
            </div>
            <input
              className="submit-button"
              type="submit"
              value={buttonText}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
