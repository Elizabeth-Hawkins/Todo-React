import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { format } from "date-fns";
import "./Popap.css";
import closeIcon from "../icon/Popap/close_popap.svg";
import axiosInstance from "../../utils/axiosInstance";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

const Popap = ({ activePopap, setActivePopap, date, changeTodos }) => {
  const [statusMessage, setStatusMessage] = useState(0);
  const [textMessage, setTextMessage] = useState("");
  const [active, setActive] = useState(false);

  const popapTime = (status) => {
    if (status === 200) {
      setTextMessage("Succsesful c;");
      setActivePopap(false);
    } 
    else
      setTextMessage("Error :c");

    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 2500);
  };

  const onSubmit = async () => {
    try {
      const { data, status } = await axiosInstance.post(
        `/todo/?date=${format(date, "Y-M-d")}`,
        values
      );
      setStatusMessage(status);
      popapTime(status);
      changeTodos(data, status)
    } catch (err) {
      popapTime(err.response.status);
      setStatusMessage(err.response.status);
    }
    finally{
      setActivePopap(false)
    }
  };

  useEffect(() => {
    console.log(statusMessage);
  }, [statusMessage]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit,
    validationSchema,
    validateOnBlur: true,
  });

  const { handleSubmit, handleChange, handleBlur, values } = formik;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className={activePopap ? "popap active" : "popap"}
          onClick={() => setActivePopap(false)}
        >
          <div
            className={activePopap ? "popap_content active" : "popap_content"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title">Create Todo</div>
            <img
              className="close_but"
              src={closeIcon}
              onClick={() => setActivePopap(false)}
              alt=""
            />
            <div className="popap_input">
              <input
                name="title"
                id="input"
                type="text"
                placeholder=" "
                className="inputTodo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <label className="placeholder" htmlFor="input">
                What do you want todo...
              </label>
            </div>
            <div className="create_but-div">
              <button className="create_but" type="submit">
                Create Todo
              </button>
            </div>
          </div>
        </div>
      </form>
      <div
        className={active ? `popap_time _${statusMessage} act` : "popap_time"}
      >
        <span className="message">{textMessage}</span>
      </div>
    </>
  );
};

export default Popap;
