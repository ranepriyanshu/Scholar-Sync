import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link } from "react-router-dom";
import { login } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const data = { email, password };
    try {
      console.log("tried");
      const response = await fetch(login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        toast.error(responseData?.data);
        throw new Error("Network response was not ok");
      } else {
        localStorage.setItem("token", responseData.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(responseData));
        navigate("/");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  return (
    // Sign in section
    <form onSubmit={handleSubmit}>
      <div className="mb-10 mt-12 flex items-center justify-center">
        <div className="w-full max-w-full flex-col items-center justify-center xl:max-w-[420px] xl:pl-4">
          <h4 className="mb-2.5 flex items-center justify-center text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-9 ml-1 flex items-center justify-center text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          {/* Google SignIn Option */}
          <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
            <div className="rounded-full text-xl">
              <FcGoogle />
            </div>
            <h5 className="text-sm font-medium text-navy-700 dark:text-white">
              Sign In with Google
            </h5>
          </div>
          {/* Or */}
          <div className="mb-6 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            <p className="text-base text-gray-600 dark:text-white"> or </p>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          </div>
          <div className="w-full">
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email"
              placeholder="yourmail@gmail.com"
              id="email"
              type="text"
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
            />
          </div>
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          {/* SignIn button */}
          <div>
            <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700  dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Sign In
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
            </span>
            <Link
              to="/auth/create-account"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
      {/* Toast Properties */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeButton={false}
      />
    </form>
  );
}
