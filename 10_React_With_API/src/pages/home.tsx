import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // If there's no user, render nothing (or a loading spinner)
  if (!user) {
    return null;
  }

  // Format the createdAt date
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">User ID:</span> {user.id}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Joined:</span> {formattedDate}
        </p>
        <div className="mt-6">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;