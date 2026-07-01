import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../validators/auth.validation-schema";

import { useState } from "react";
import { forgotPassword } from "../api/auth.api";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // api call
      setApiError("");
      await forgotPassword(data);
      reset();
    } catch (error) {
      // console.log(error);
      //   setApiError(error.response.data.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-center text-sm text-gray-300 mb-6">
          No worries! Just enter your registered email below and we'll send you
          a link to reset your password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 cursor-pointer mt-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-lg flex justify-center items-center"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
            ) : (
              "Send Reset Link "
            )}
          </button>
        </form>
        <p className="text-red-400 text-sm">{apiError}</p>

        <button
          className="text-white mt-2 hover:underline font-medium cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
