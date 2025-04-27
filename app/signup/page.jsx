"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("User data", user);
      const response = await axios.post("/api/register", user);
      console.log("Signup success", response.data);
      router.push("/sign-in");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    setPasswordRules({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });

    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div className="prompt_card p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          required
        />

        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-400 focus:text-black"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              evaluatePasswordStrength(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Password Strength Bar */}
        <div className="w-full h-2 rounded bg-gray-300 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              passwordStrength === "weak"
                ? "bg-red-500 w-1/3"
                : passwordStrength === "medium"
                ? "bg-yellow-500 w-2/3"
                : passwordStrength === "strong"
                ? "bg-green-500 w-full"
                : "w-0"
            }`}
          ></div>
        </div>

        {/* Password Rules */}
        <p className="text-sm text-gray-500 mt-2">
          Password must contain at least:
          <ul className="list-disc ml-5">
            <li className={`flex items-center ${passwordRules.minLength ? "text-green-500" : ""}`}>
              {passwordRules.minLength && <span className="mr-2">✔</span>} 8 characters
            </li>
            <li className={`flex items-center ${passwordRules.uppercase ? "text-green-500" : ""}`}>
              {passwordRules.uppercase && <span className="mr-2">✔</span>} One uppercase letter
            </li>
            <li className={`flex items-center ${passwordRules.lowercase ? "text-green-500" : ""}`}>
              {passwordRules.lowercase && <span className="mr-2">✔</span>} One lowercase letter
            </li>
            <li className={`flex items-center ${passwordRules.number ? "text-green-500" : ""}`}>
              {passwordRules.number && <span className="mr-2">✔</span>} One number
            </li>
            <li className={`flex items-center ${passwordRules.specialChar ? "text-green-500" : ""}`}>
              {passwordRules.specialChar && <span className="mr-2">✔</span>} One special character
            </li>
          </ul>
        </p>

        <button
          type="submit"
          className={`w-full black_btn mt-4 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/sign-in"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Signup;