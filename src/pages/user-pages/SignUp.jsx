import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validators/auth.validation-schema";
import { signupUser } from "../../api/auth.api";

export default function SignUp() {
  const navigate = useNavigate();

  // const [seenPassword,setSeenPassword] = useState(true)
  // const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    try {
      // setApiError("");
      await signupUser(data);
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);

      // setApiError(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-sm text-gray-300 mb-6">
          Signup and start exploring
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-400 text-sm">{errors.name?.message}</p>
          </div>

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

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              // type={seenPassword ? "password": "text"}
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-400 text-sm">{errors.pasword?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-lg flex justify-center items-center"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "SignUp"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?
          <button
            className="text-purple-400 hover:underline font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
