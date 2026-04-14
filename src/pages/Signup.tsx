const Signup = () => {
  function handleSignup() {}
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <label> Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white 
                outline-1 -outline-offset-1 outline-white/10
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 
                focus:outline-indigo-500 sm:text-sm/6 mt-2"
          />
          <label> Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white 
                outline-1 -outline-offset-1 outline-white/10
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 
                focus:outline-indigo-500 sm:text-sm/6 mt-2"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white
                  outline-1 -outline-offset-1 outline-white/10
                  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-500 sm:text-sm/6 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
