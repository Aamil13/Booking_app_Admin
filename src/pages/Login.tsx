import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoginImage from '../assets/ai-generated-9145898_1920.jpg';
import icon from '../../public/favicon-32x32.png';
import { Input } from 'antd';
import {
  TiSocialGooglePlusCircular,
  TiSocialGithubCircular,
  TiSocialInstagramCircular,
  TiSocialLinkedinCircular,
  TiSocialTwitter,
} from 'react-icons/ti';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { useLogin } from '../services/auth';

import { Link } from 'react-router-dom';
type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({});
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useLogin();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen justify-between">
      <div className=" fixed flex w-full items-center justify-start gap-3 py-5 px-6">
        <img src={icon} alt="icon" />
        <h1 className="text-xl font-bold text-white">Booking-Admin</h1>
      </div>
      <img
        src={LoginImage}
        alt="Image"
        className="w-3/4 max-xl:w-2/3 max-lg:w-1/2 max-sm:hidden object-cover"
      />
      {/* //login  */}
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome to Booking! <span className="">👋🏻</span>{' '}
          </h2>
          <p className="text-sm text-slate-600">
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <div className="bg-green-300 p-2  text-white rounded-lg">
          User Name: admin / Pass: admin
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-9/12 gap-5 "
        >
          <div className="relative flex flex-col gap-1">
            <label className="font-normal">Name</label>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.username && (
              <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
                {errors.username.message
                  ? errors.username.message
                  : 'Please enter your user Name!'}
              </span>
            )}
          </div>

          <div className="relative w-full flex flex-col gap-2">
            <label htmlFor="Password" className="font-medium text-neutral-900">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} type={showPassword ? 'text' : 'password'} />
              )}
            />
            <div
              className={`absolute  right-0 pr-3 flex items-center text-sm ${errors.password ? 'top-10' : 'top-10'} `}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="h-5 w-5 text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye
                  className="h-5 w-5 text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
                Please enter your password!
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 ">
              <input type="checkbox" className="w-4 h-4" />
              <p className="text-sm">Remember me</p>
            </div>
            <button type="button" className="text-slate-600 text-sm">
              Forgot Password?
            </button>
          </div>
          <button className="bg-green-400 p-2 rounded-lg text-white hover:bg-green-500 transition-all duration-200 ">
            Login
          </button>
          <p className="text-sm text-center">
            Don't have an account yet?{'  '}
            <Link to={'/register'}>
              <span className="text-green-400"> Create Account</span>
            </Link>
          </p>

          <div className=" relative flex justify-center">
            <p className="bg-white w-7 text-center"> or</p>
            <p className="absolute h-[1px] top-1/2 -z-10 w-full bg-slate-200"></p>
          </div>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <TiSocialGooglePlusCircular />
            <TiSocialGithubCircular />
            <TiSocialInstagramCircular />
            <TiSocialLinkedinCircular />
            <TiSocialTwitter />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
