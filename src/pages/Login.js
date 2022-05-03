import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../components/form/Error";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import { useAuthContext } from "../context/AuthContext";
import AdminServices from "../services/AdminServices";
import { notifySuccess } from "../utils/toast";
import Logo from "../assets/img/Logo.png";
import ExtendedButton from "../components/extendedButton/ExtendedButton";

// Super Admin:- isAdmin: true, is_staff: true, role: admin
// Admin:- role: admin, is_staff: false, is_admin: true
// Delivery:-  role: delivery_admin, is_staff: false, is_admin: true

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { adminInfo },
    dispatch,
  } = useAuthContext();

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (adminInfo && adminInfo.token) {
      history.push("/");
    }
  }, [adminInfo, history]);

  const onSubmit = ({ email, password }) => {
    setLoading(true);
    AdminServices.login({ email: email, password: password })
      .then((res) => {
        if (res) {
          setLoading(false);
          notifySuccess("Login Success!");
          dispatch({ type: "USER_LOGIN", payload: res.data });

          localStorage.setItem("adminInfo", JSON.stringify(res.data));

          history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 w-full">
              <div className="w-full">
                <div className="mb-16 w-48 mx-auto text-center">
                  <img className="w-full" src={Logo} alt="SmartParcel" />
                </div>

                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Email" />
                  <InputArea
                    register={register}
                    defaultValue="admin@gmail.com"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                  />
                  <Error errorName={errors.email} />

                  <div className="mt-6"></div>

                  <LabelArea label="Password" />
                  <InputArea
                    register={register}
                    defaultValue="12345678"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="***************"
                  />
                  <Error errorName={errors.password} />

                  <ExtendedButton
                    loading={loading}
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                    to="/dashboard"
                  >
                    Log in
                  </ExtendedButton>
                </form>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
