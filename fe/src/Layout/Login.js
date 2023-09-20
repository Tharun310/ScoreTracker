import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { employeeloginSchema } from "../Validation/YupSchema";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Service/LoginSignupService";
function Login() {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);


  const onSubmit2 = async (values, actions) => {
    let login = await loginUser(values.email, values.password);
    console.log(login);
    if (login.status === 200) {
      sessionStorage.setItem("token", login.data.token);
      sessionStorage.setItem("user", login.data.email);
      sessionStorage.setItem("name", login.data.name);
      // document.cookie = `token=${login.data.token}; Secure; HttpOnly; SameSite=Strict`;
      toast.success(login.data.message, {
        autoClose: 2000,
      });

      setTimeout(() => {
        actions.resetForm();
        if (login.data.role === "user") navigate("/dashboard");
        else if (login.data.role === "admin") navigate("/admin");
      }, 3000);
    } else {
      toast.error(login.data.message, {
        autoClose: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: employeeloginSchema,
    onSubmit: onSubmit2,
  });

  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("name");
  }, []);

  return (
    <div>
      <div className="container-ls">
        <div className="screen">
          <div className="screen__content">
            <form
              onSubmit={formik.handleSubmit}
              className="form login"
              autoComplete="off"
            >
              <div className="login__field">
                <i className="login__icon fas fa-solid fa-envelope"></i>
                <input
                  type="text"
                  className="login__input"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type={showIcon ? "text" : "password"}
                  className="login__input"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                />
                <div className="eye-icon">
                  {showIcon ? (
                    <VisibilityIcon
                      className="visibility-icon"
                      onClick={() => {
                        setShowIcon(false);
                      }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibility-icon"
                      onClick={() => {
                        setShowIcon(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="login-submit-div">
                <button
                  className="button login__submit"
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  <span className="button__text">Log in Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </div>
            </form>
            <div className="signup-submit-div">
              <div className="singup-button-login-page">
                <p className="text-info-ls">New to Organization?</p>
                <button
                  className="button signup__submit"
                  onClick={() => navigate("/signup")}
                >
                  <i className="button__icon_left fas fa-chevron-left"></i>
                  <span className="button__text">Sign up now</span>
                </button>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
