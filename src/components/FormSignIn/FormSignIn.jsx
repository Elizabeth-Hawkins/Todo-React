import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../style/Form.css";
import TextField from "../TextField";
import axiosInstance from "../../utils/axiosInstance";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

function FormSignIn() {
  const navigate = useNavigate();
  const [typeFieldPas, setTypeFieldPas] = useState("password");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    status: 0,
  });

  const onSubmit = async () => {
    try {
      const { data, status } = await axiosInstance.post("/auth/login", values);
      const { token, username } = data;

      if (username) {
        window.localStorage.setItem("user", username);
      }
      if (token) {
        window.localStorage.setItem("accessToken", token);
        navigate("/");
        window.location.reload()
      }

      setResponseMessage({
        message: data.message,
        status,
      });
    } catch (err) {
      console.log(err);
      setResponseMessage({
        message: err.response.data.message,
        status: err.response.status,
      });
    }
  };

  const ChangeType = () => () => {
    setTypeFieldPas(typeFieldPas === "password" ? "text" : "password");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
    validateOnBlur: true,
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  return (
    <form className="form_flex" onSubmit={handleSubmit}>
      <div className="form">
        <div className="content_form">
          <div className="account_but">
            <h2 className="title_block">Account Sign In</h2>
            <Link to="/sign-up" className="but_link">
              Sign Up
            </Link>
          </div>

          <TextField
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.username}
            name="username"
            touched={touched.username}
            error={errors.username}
            title="User Name"
          />

          <TextField
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.password}
            name="password"
            touched={touched.password}
            error={errors.password}
            title="Password"
            type={typeFieldPas}
            ChangeType={ChangeType}
          />     
            <span className={`errorMessage _${responseMessage.status}`}>
              {responseMessage.message}
            </span>      
          <button type="submit" className="but_sub">
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
}

export { FormSignIn };
