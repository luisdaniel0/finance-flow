import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, login } from "../services/api";

interface SignupProps {
  onLogin: () => void;
}

const Signup = ({ onLogin }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    try {
      await signup(username, password, email);
      await login(username, password);
      onLogin();
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message === "Failed to fetch"
            ? "Unable to reach the server. Please try again later."
            : err.message
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white
                  outline-1 -outline-offset-1 outline-white/10
                  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white
                  outline-1 -outline-offset-1 outline-white/10
                  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white
                  outline-1 -outline-offset-1 outline-white/10
                  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm
              font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
