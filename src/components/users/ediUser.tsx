import axios from "axios";
import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditUserForm() {
  const { userId } = useParams(); // Get user ID from URL params
  const [formData, setFormData] = useState({
    imageFiles: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Fetch user details for editing
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token is missing. Please log in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5003/api/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData({
          ...response.data,
          imageFiles: "", // Placeholder for new image files
          password: "", // Leave blank for security
          confirmPassword: "", // Leave blank for security
        });
      } catch (error) {
        console.error(
          "Error fetching user details:",
          error.response || error.message
        );
        toast.error(
          `Failed to fetch user details: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFiles") {
      setFormData({ ...formData, imageFiles: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const promisesArray = [];
    if (formData.imageFiles) {
      for (let i = 0; i < formData.imageFiles.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(formData.imageFiles[i]);
      }
    }
    const imgUrls = await Promise.all(promisesArray);

    const {
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      password,
      confirmPassword,
    } = formData;

    // Validate passwords match
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Prepare updated user data
    const updatedUser = {
      imgUrls,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      ...(password && { password }), // Include password if changed
    };

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in.");
      return;
    }

    try {
      // Make API call
      await axios.put(`http://localhost:5003/api/user/${userId}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error.response || error.message);
      toast.error(
        `Failed to update user: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-full max-w-xl bg-opacity-80">
        <div className="flex justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit User Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="imageFiles"
              className="block text-sm font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="imageFiles"
              name="imageFiles"
              className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              multiple
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* First and Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address and Phone Number */}
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
                name="address"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
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
                name="password"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
