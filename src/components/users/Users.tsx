import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]); // Using any[] as a placeholder type
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null); // For error messages

  useEffect(() => {
    if (!usersLoaded) {
      axios
        .get("http://localhost:5003/api/user")
        .then((res) => {
          // Handle successful response
          if (res.data && Array.isArray(res.data.list)) {
            setUsers(res.data.list);
          } else {
            setUsers([]); // Handle unexpected structure
            console.error("Unexpected response structure:", res.data);
          }
          setUsersLoaded(true);
        })
        .catch((err) => {
          // Handle errors
          console.error("Error fetching users:", err);
          setError("Failed to load users.");
          setUsers([]); // Ensure users is always an array
          setUsersLoaded(true);
        });
    }
  }, [usersLoaded]);

  return (
    <div className="p-8 min-h-screen bg-gray-100 relative">
      <Link
        to={"/register"}
        className="absolute right-[25px] bottom-[25px] text-[25px] bg-white p-4 rounded-full text-green-800bg-green-800 border-green-800bg-green-800 border-2 hover:bg-blue-100 shadow-lg"
      >
        <FaPlus />
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users Page</h1>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>
      )}
      {usersLoaded ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  First Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  Last Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold w-1/5">
                  Phone Number
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  Image
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {user.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {user.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 truncate w-1/5">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {user.imgUrl}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 flex gap-4 justify-center items-center">
                    <button
                      className="text-green-500 hover:text-green-700"
                      // Uncomment for delete functionality when needed
                      // onClick={() => {
                      //   const token = localStorage.getItem("token");
                      //   axios
                      //     .delete(
                      //       `http://localhost:5000/api/users/${user.userId}`,
                      //       {
                      //         headers: {
                      //           Authorization: `Bearer ${token}`,
                      //         },
                      //       }
                      //     )
                      //     .then((res) => {
                      //       console.log(res.data);
                      //       toast.success("User deleted successfully");
                      //       setUsersLoaded(false);
                      //     });
                      // }}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-green-800bg-green-800 hover:text-green-800bg-green-800"
                      onClick={() => {
                        navigate("/admin/users/edituser", {
                          state: { user: user },
                        });
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[60px] h-[60px] border-[4px] border-gray-400 border-b-blue-700 animate-spin rounded-full "></div>
        </div>
      )}
    </div>
  );
}
