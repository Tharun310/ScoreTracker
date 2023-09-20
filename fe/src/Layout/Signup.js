import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { employeeSignupSchema } from "../Validation/YupSchema";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Service/LoginSignupService";
import StrengthMeter from "../Validation/StrengthMeter";

function Signup() {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  const [showIcon1, setShowIcon1] = useState(false);
  
  const onSubmit = async (values, actions) => {
    let signup = await signupUser(values);
    if (signup.status === 200) {
      toast.success(signup.data.message, {
        autoClose: 2000,
      });
      setTimeout(() => {
        actions.resetForm();
        navigate("/");
      }, 3000);
    } else {
      toast.error(signup.data.message, {
        autoClose: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      fName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: employeeSignupSchema,
    onSubmit: onSubmit,
  });
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

  return (
    <div>
      <div className="container-ls">
        <div className="screen">
          <div className="screen__content">
            <form
              onSubmit={formik.handleSubmit}
              className="form  Signup"
              autoComplete="off"
            >
              <div className="signup__field">
                <i className="signup__icon fas fa-user"></i>
                <input
                  type="text"
                  className="signup__input"
                  id="fName"
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full Name"
                />
                {formik.errors.fName && formik.touched.fName && (
                  <div className="error">{formik.errors.fName}</div>
                )}
              </div>
              <div className="signup__field">
                <i className="signup__icon fas fa-solid fa-envelope"></i>
                <input
                  type="text"
                  className="signup__input"
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
              <div className="signup__field">
                <i className="signup__icon fas fa-lock"></i>
                <input
                  type={showIcon ? "text" : "password"}
                  className="signup__input"
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

                <StrengthMeter
                  password={formik.values.password}
                  actions={initPwdInput}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="error password-error">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="separation"></div>
              <div className="signup__field">
                <i className="signup__icon fas fa-lock"></i>
                <input
                  type={showIcon1 ? "text" : "password"}
                  className="signup__input"
                  id="cPassword"
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm Password"
                />
                <div className="eye-icon">
                  {showIcon1 ? (
                    <VisibilityIcon
                      className="visibility-icon"
                      onClick={() => {
                        setShowIcon1(false);
                      }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibility-icon"
                      onClick={() => {
                        setShowIcon1(true);
                      }}
                    />
                  )}
                </div>
                {formik.errors.cPassword && formik.touched.cPassword && (
                  <div className="error">{formik.errors.cPassword}</div>
                )}
              </div>

              <div className="signup-submit-div-signup">
                <button
                  className="button signup__submit"
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  <span className="button__text">Sign up Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </div>
            </form>
            <div className="login-submit-div">
              <div className="login-button-signup-page">
                <p className="text-info-ls">Already a member?</p>
                <button
                  className="button login__now__button"
                  onClick={() => navigate("/")}
                >
                  <i className="button__icon_left fas fa-chevron-left"></i>
                  <span className="button__text">Log in now</span>
                </button>
              </div>
            </div>
          </div>
          <div className="screen__background_signup">
            <span className="screen__background__shape_signup screen__background__shape3_signup"></span>
            <span className="screen__background__shape_signup screen__background__shape2_signup"></span>
            <span className="screen__background__shape_signup screen__background__shape1_signup"></span>
            <span className="screen__background__shape_signup screen__background__shape4_signup"></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
