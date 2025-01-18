import axios from "axios";
import { Leaf } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [imgUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit() {
    // const promisesArray = [];
    // for (let i = 0; i < imageFiles.length; i++) {
    //   promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    // }
    // const imgUrls = await Promise.all(promisesArray);
    // console.log(imgUrls);

    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      profilePic: imgUrl,
    };
    // const token = localStorage.getItem("token");
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", user, {
        // headers: {
        //   Authorization: "Bearer " + token,
        // },
      });
      navigate("/");
      toast.success("Product Add successfully");
    } catch (error) {
      toast.error("Failed to add product" + error);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-full max-w-xl h-auto bg-opacity-80">
        <div className="flex justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account for Users
        </h2>
        <form>
          {/* Profile Picture in Single Column */}
          <div className="mb-4">
            <label
              htmlFor="profile-picture"
              className="block text-sm font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="text"
              id="profile-picture"
              className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={imgUrl}
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            />
          </div>

          {/* Email in Single Column */}
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

          {/* First Name and Last Name in First Row (Two-Column Layout) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your first name"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your last name"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Address and Phone Number in Next Row (Two-Column Layout) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your phone number"
                required
                value={phoneNumber}
                onChange={(e) => {
                  setphoneNumber(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Password Fields in Two Columns */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
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
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
