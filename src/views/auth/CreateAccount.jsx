import React, { useState } from "react";
import InputField from "components/fields/InputField";
import { InstituteNames } from "../../constants/collabPostData";
import { registerUser } from "constants/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [collegeFilter, setCollegeFilter] = useState("");
  const [role, setRole] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[2].value;
    const collegeName = e.target[3].value;
    const email = e.target[4].value;
    const phoneNumber = e.target[5].value;
    const password = e.target[6].value;
    const domain = e.target[8].value;

    // Perform form validation
    if (
      !role ||
      !fullName ||
      !collegeName ||
      !email ||
      !phoneNumber ||
      !password ||
      !domain
    ) {
      toast.error("Please enter all required details.");
      return;
    }

    try {
      const response = await fetch(registerUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          fullName,
          collegeName,
          phoneNumber,
          domain,
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem("token", responseData.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(responseData));
        toast.success("Your account has been created successfully! ");
        toast.success("Please verify your email to Login", {
          onClose: () => navigate("/auth"), // Navigate to "/auth" after toast is closed
        });
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast.error("Failed to create account. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10 mt-12 flex items-center justify-center">
        <div className="w-full max-w-full flex-col items-center justify-center xl:max-w-[420px] xl:pl-4">
          <h4 className="mb-2.5 flex items-center justify-center text-4xl font-bold text-navy-700 dark:text-white">
            Sign Up
          </h4>
          <p className="mb-9 ml-1 flex items-center justify-center text-base text-gray-600">
            Create an account to begin!
          </p>
          <div className="m-4 flex items-center justify-between px-2 dark:text-white">
            {/* Student Radio Button */}
            <label htmlFor="student">Student</label>
            <input
              type="radio"
              id="student"
              value="student"
              name="role"
              onChange={handleRoleChange}
            />

            {/* Professor Radio Button */}
            <label htmlFor="professor">Professor</label>
            <input
              type="radio"
              id="professor"
              value="professor"
              name="role"
              onChange={handleRoleChange}
            />
          </div>
          <div className="w-full">
            {/* Full Name */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Full Name"
              placeholder="Your Full Name"
              id="fullname"
              name="fullname" // Adding name attribute
              type="text"
            />

            {/* College Name */}
            <div className="mb-3">
              <label
                htmlFor="college"
                className="block text-sm font-medium text-navy-700 dark:text-white"
              >
                College Name
              </label>
              <select
                id="college"
                name="college"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-500 dark:focus:ring-brand-500"
                onChange={(e) => setCollegeFilter(e.target.value)}
                value={collegeFilter}
              >
                <option value="">Select College</option>
                {InstituteNames.filter((name) =>
                  name.includes(collegeFilter)
                ).map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email"
              placeholder="yourmail@gmail.com"
              id="email"
              name="email" // Adding name attribute
              type="text"
            />

            {/* Phone Number */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Phone Number"
              placeholder="Your Phone Number"
              id="phoneNumber"
              name="phoneNumber" // Adding name attribute
              type="text"
            />

            {/* Password */}
            <div className="relative">
              <InputField
                variant="auth"
                extra="mb-3"
                label="Password"
                placeholder="Min. 8 characters"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handlePasswordToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              />
            </div>

            {/* Domain */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Domain"
              placeholder="Your Domain"
              id="domain"
              name="domain" // Adding name attribute
              type="text"
            />

            {/* Sign Up button */}
            <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Sign Up
            </button>
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
};

export default CreateAccount;
