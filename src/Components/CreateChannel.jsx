import { useState } from "react";
import { createChannel } from "../Utils/ChannelApi"; // adjust path as needed
import { useAuth } from "../Context/AuthContext";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateChannel = ({ onCancel }) => {
    const navigate=useNavigate();// Used to redirect after channel creation

    // Form state to hold input values for channel creation
  const [form, setForm] = useState({
    channelName: "",
    handle: "",
    description: "",
    channelBanner: "",
  });
   // State for showing error messages if channel creation fails
  const [error, setError] = useState("");
  // Get logged-in user info from auth context
  const { user } = useAuth();
// Update form state when any input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 // Handle form submission to create a new channel
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
       // Call API to create channel with form data and token
      const response = await createChannel(form, token);
      const newChannel = response.data;
      setForm(newChannel);
      // Redirect user to the newly created channel's page using its handle
      navigate(`/channel/${newChannel.handle}`);
    } catch (err) {
      setError(err.response?.data?.message || "Channel creation failed.");
    }
  };

  return (
     // Overlay covering entire screen with blur effect, fixed position and z-index for modal
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-16 z-50 overflow-auto">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-200 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">How you'll appear</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl">
              <User />
            </div>
          )}
        </div>

        <p className="text-center text-blue-600 mb-4 cursor-pointer">Select picture</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
          type="text"
            name="channelName"
            placeholder="Channel Name"
            value={form.channelName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
          type="text"
            name="handle"
            placeholder="Channel Handle (e.g., mychannel123)"
            value={form.handle}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
          type="textarea"
            name="description"
            placeholder="Channel Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
          type="text"
            name="channelBanner"
            placeholder="Banner Image URL"
            value={form.channelBanner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <p className="text-xs text-gray-500 leading-snug">
            By clicking Create Channel you agree to our{" "}
            <span className="text-blue-600 underline cursor-pointer">Terms of Service</span>.
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create channel
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default CreateChannel;