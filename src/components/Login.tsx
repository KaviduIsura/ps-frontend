import axios from "axios";
import { Leaf } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault(); // Prevent form submission

    console.log("Login function called"); // Debugging statement
    console.log("Email:", email); // Ensure email is correctly captured
    console.log("Password:", password); // Ensure password is correctly captured

    axios
      .post("http://localhost:5003/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("Response received:", res.data); // Debug server response

        // Check if user data exists in the response
        if (!res.data.user) {
          console.error("User data not found in response");
          toast.error("Login failed: " + res.data.message);
          return;
        }

        // Success: Store token and navigate
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Catch errors and log them
        console.error("Error during login:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('../assets/background.jpg')" }}
    >
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-60">
        <div className="flex justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Green Control
        </h2>
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
