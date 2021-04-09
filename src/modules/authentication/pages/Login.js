import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { showToastr } from "src/shared/plugins/toastr";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const Login = () => {
  const emailIsvalid = "The email is invalid";
  const emailReqiured = "The email is reqiured";
  const passwordReuired = "The password is reqiured";

  const schema = yup.object().shape({
    email: yup.string().email(emailIsvalid).required(emailReqiured),
    password: yup.string().required(passwordReuired),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const [isShow, setIsShow] = useState(false);

  const submitForm = async (loginForm) => {
    const res = await dispatch(login(loginForm));
    unwrapResult(res);
    showToastr("Login Successfully!!", "success");
    reset();
    history.push("/");
  };

  return (
    <div className="bg-gray-100 h-full">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center h-full">
          <div className="rounded-xl bg-white xl:w-4/6 w-5/6 shadow-2xl flex">
            <div className="pt-6 p-8 space-y-4 xl:w-2/4 md:w-3/4 sm:w-full">
              <h3 className="text-3xl mb-1">Login</h3>
              <span className="text-gray-400 text-sm">
                Sign In to your account
              </span>
              <form className="grid gap-7" onSubmit={handleSubmit(submitForm)}>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="xl:col-span-1 col-span-1 flex items-center">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={() => (
                      <div className="xl:col-span-3 col-span-2 mt-1">
                        <input
                          type="text"
                          {...register("email")}
                          className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <span className="text-red-600 text-sm">
                          {errors?.email?.message}
                        </span>
                      </div>
                    )}
                  />
                </div>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="col-span-1 flex items-center">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={() => (
                      <div className="xl:col-span-3 col-span-2 mt-1">
                        <div className="relative">
                          <input
                            type={isShow ? "text" : "password"}
                            {...register("password")}
                            className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {isShow ? (
                            <EyeIcon
                              className="h-6 w-6 right-2 top-2/4 absolute transform -translate-y-2/4 cursor-pointer"
                              onClick={() => setIsShow(false)}
                            />
                          ) : (
                            <EyeOffIcon
                              className="h-6 w-6 right-2 top-2/4 absolute transform -translate-y-2/4 cursor-pointer"
                              onClick={() => setIsShow(true)}
                            />
                          )}
                        </div>
                        <span className="text-red-600 text-sm">
                          {errors?.password?.message}
                        </span>
                      </div>
                    )}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-white text-blue-600 p-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                  >
                    Login
                  </button>
                  <Link to="/register">
                    <span className="text-blue-600 hover:underline">
                      Forgot password
                    </span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="text-center w-2/4 md:block hidden">
              <div className="bg-blue-600 h-full rounded-br-xl rounded-tr-xl p-12 grid">
                <h3 className="text-3xl text-center text-white">Sign up</h3>
                <p className="text-center text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/register">
                  <button
                    type="button"
                    className="text-white p-2 hover:bg-blue-800 rounded"
                  >
                    Register Now!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
