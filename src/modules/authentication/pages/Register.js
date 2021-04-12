import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { showToastr } from "src/shared/plugins/toastr";
import { handleRegister } from "../store";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const messageRequired = (field) => {
    return `The ${field} is required`;
  };
  const messageInvalid = (field) => {
    return `The ${field} is invalid`;
  };

  const schema = yup.object().shape({
    username: yup.string().required(messageRequired("username")),
    email: yup
      .string()
      .required(messageRequired("email"))
      .email(messageInvalid("email")),
    password: yup.string().required(messageRequired("password")),
    passwordConfirm: yup
      .string()
      .required(messageRequired("password confirm"))
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const [isShow, setIsShow] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = async (registerForm) => {
    const res = await dispatch(handleRegister(registerForm));
    unwrapResult(res);
    showToastr("Register Successfully. Please login again", "success");
    reset();
    history.push("/login");
  };

  return (
    <div className="bg-gray-100 h-full">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center h-full">
          <div className="rounded-xl bg-white md:w-4/6 sm:w-5/6 lg:w-3/6 w-11/12 shadow-2xl flex">
            <div className="pt-6 p-8 space-y-4 w-full">
              <h3 className="text-3xl mb-1">Register</h3>
              <span className="text-gray-400 text-sm">Create your account</span>
              <form className="grid gap-7" onSubmit={handleSubmit(submitForm)}>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="xl:col-span-1 col-span-1 flex items-center">
                    Username
                  </label>
                  <div className="xl:col-span-3 col-span-2">
                    <input
                      type="text"
                      {...register("username")}
                      className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="text-red-600 text-sm">
                      {errors?.username?.message}
                    </span>
                  </div>
                </div>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="xl:col-span-1 col-span-1 flex items-center">
                    Email
                  </label>
                  <div className="xl:col-span-3 col-span-2">
                    <input
                      type="text"
                      {...register("email")}
                      className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="text-red-600 text-sm">
                      {errors?.email?.message}
                    </span>
                  </div>
                </div>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="col-span-1 flex items-center">
                    Password
                  </label>
                  <div className="xl:col-span-3 col-span-2">
                    <div className="relative">
                      <input
                        type={isShow ? "text" : "password"}
                        {...register("password")}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                </div>
                <div className="grid xl:grid-cols-4 grid-cols-3">
                  <label className="col-span-1 flex items-center">
                    Confirm password
                  </label>
                  <div className="xl:col-span-3 col-span-2">
                    <div className="relative">
                      <input
                        type={isShowPasswordConfirm ? "text" : "password"}
                        {...register("passwordConfirm")}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {isShowPasswordConfirm ? (
                        <EyeIcon
                          className="h-6 w-6 right-2 top-2/4 absolute transform -translate-y-2/4 cursor-pointer"
                          onClick={() => setIsShowPasswordConfirm(false)}
                        />
                      ) : (
                        <EyeOffIcon
                          className="h-6 w-6 right-2 top-2/4 absolute transform -translate-y-2/4 cursor-pointer"
                          onClick={() => setIsShowPasswordConfirm(true)}
                        />
                      )}
                    </div>
                    <span className="text-red-600 text-sm">
                      {errors?.passwordConfirm?.message}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    Create Account
                  </button>
                </div>
                <hr />
                <Link to="/login">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      Login
                    </button>
                  </div>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
