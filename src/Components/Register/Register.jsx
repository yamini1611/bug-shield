import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Label, Container, Button } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import "../Styles/Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  const [nextComputerId, setNextComputerId] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:44365/api/Users").then((response) => {
      const users = response.data;

      if (users.length > 0) {
        const lastUser = users[users.length - 1];
        const lastComputerId = lastUser.computerid;

        const nextId = lastComputerId + 1;
        setNextComputerId(nextId);
      } else {
        setNextComputerId(2);
      }
    });
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    Username: Yup.string().required("Username is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      Username: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://localhost:44365/api/Users",
          {
            email: values.email,
            password: values.password,
            Username: values.Username,
            phone: values.phone,
            computerid: nextComputerId,
          }
        );

        console.log("API Response:", response);
        if (response.status === 200) {
          const user = response.data;
          console.log("user details ", user);
          toast.success("Registered Successfully!", {
            icon: <CheckCircleIcon />,
          });

          setNextComputerId(nextComputerId + 1);

          setTimeout(() => {
            Navigate("/Login");
          }, 2000);
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("API request failed:", error);
        setError("Invalid email or password");
      }
    },
  });

  return (
    <Container id="regdiv">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-5 col-sm-12  mt-5 p-5">
        <h1 className="text-center">Register</h1>
        <Form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
  
          <div className="mb-3">
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Enter Username"
              name="Username"
              value={formik.values.Username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Username && formik.errors.Username && (
              <p className="text-danger">{formik.errors.Username}</p>
            )}
          </div>
          <div className="mb-3">
            <Label>Phone</Label>
            <Input
              type="number"
              pattern="[0-9]{10}"
              placeholder="Enter phone number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
  
          {error && <p className="text-danger">{error}</p>}
          <Button type="submit" className="btn-dark mt-3">
            Register
          </Button>
          <h6 className="mt-3 text-center">
            Already have an Account?{" "}
            <Link to="/Login" id="link">
              Login here
            </Link>
          </h6>
        </Form>
      </div>
      <div className="col-md-5 col-sm-12">
        <img
          alt="reg"
          src="https://img.freepik.com/free-vector/add-user-concept-illustration_114360-557.jpg?size=626&ext=jpg&ga=GA1.2.99625817.1684863857&semt=ais"
          className="img-fluid"
        />
      </div>
      <ToastContainer />
    </div>
  </Container>
  
  );
};

export default Register;
