import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@windmill/react-ui";
import BicycleRider from "../assets/img/bicycle-rider.png";
import Error from "../components/form/Error";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import AdminServices from "../services/AdminServices";
import { notifySuccess } from "../utils/toast";
import Spinner from "../components/spinner";
import CustomError from "../components/customError";

const ConfirmPassword = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    params: { token },
  } = useRouteMatch();

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/forgot-password");
    }
  }, [token, history]);

  const onSubmit = ({ password }) => {
    setLoading(true);
    setApiErrors([]);

    AdminServices.confirmPassword({ password, token })
      .then(({ status }) => {
        setLoading(false);

        if (status >= 200 && status < 300) {
          notifySuccess("Your password has been changed successfully.");
        }
      })
      .catch((err) => {
        setLoading(false);

        setApiErrors(err.response.data.password);
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={BicycleRider}
              alt="Office"
            />
          </div>

          <main className="flex flex-col items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Enter New Password
                </h1>

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

                <Button
                  type="submit"
                  className="mt-4 h-12 w-full"
                  disabled={loading}
                >
                  {loading && <Spinner />}
                  Change Password
                </Button>
              </form>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>

            {apiErrors.length > 0 ? (
              <CustomError>
                {apiErrors.map((error, i) => (
                  <li key={error.substr(0, 4) + i} className="text-sm">
                    {error}
                  </li>
                ))}
              </CustomError>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
