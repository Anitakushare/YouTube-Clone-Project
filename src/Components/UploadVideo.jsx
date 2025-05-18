import React, { useState ,useEffect} from "react";
import { addVideo,updateVideo} from "../Utils/VideoApi";
import { useAuth } from "../Context/AuthContext";
import { useGlobal } from "../Context/GlobalContext";
//Category button for video category
const categories = ["Music", "Live", "Entertainment", "Sports", "Gaming", "News", "Other"];

export default function VideoUpload({ onClose ,editingVideo,onUpdate,onVideoUploaded}) {
  const {channel}=useGlobal()
    const {user}=useAuth();
    const channelId = channel?._id;
  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    description: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //Edit video function
   useEffect(() => {
    if (editingVideo) {
      setFormData({
        title: editingVideo.title || "",
        thumbnailUrl: editingVideo.thumbnailUrl || "",
        videoUrl: editingVideo.videoUrl || "",
        description: editingVideo.description || "",
        category: editingVideo.category || "",
      });
    }
  }, [editingVideo]);

//handle input data
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };
//validate function
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.thumbnailUrl.trim()) newErrors.thumbnailUrl = "Thumbnail URL is required";
    if (!formData.videoUrl.trim()) newErrors.videoUrl = "Video URL is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
//handle submit function
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    //if set loading true get token from localstorage
    setLoading(true);
    const token = localStorage.getItem("token");
    const userId = user.userId;
    const payload = {
      ...formData,
      uploader: userId,
      channelId:channelId
    };

    if (editingVideo) {
      // Update existing video
      const updatedVideo=await updateVideo(editingVideo._id, payload, token);
     onUpdate(updatedVideo);
     onVideoUploaded(response); // Notify parent of the update
    onClose(); // Close the modal
      setMessage("Video updated successfully!");
    } else {
      console.log("Uploading video with data:", {payload});
      // Add new video
     const response = await addVideo(channelId, { ...formData, uploader: userId }, token);
      setFormData(response);

      setMessage("Video uploaded successfully!");
    }
//after submission empty form data
    setFormData({
      title: "",
      thumbnailUrl: "",
      videoUrl: "",
      description: "",
      category: "",
    });
    onClose(); // Close the modal after submission
  } catch (err) {
    console.error(err);
    setMessage("Failed to process the video.");
  } finally {
    setLoading(false);
  }
};
//upload form
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-16 z-50 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-semibold">{editingVideo ? "Edit Video" : "Upload Video"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description *</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded resize-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Thumbnail URL *</label>
            <input
              type="text"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.thumbnailUrl ? "border-red-500" : "border-gray-300"}`}
              placeholder="https://example.com/thumbnail.jpg"
            />
            {errors.thumbnailUrl && <p className="text-red-500 text-sm">{errors.thumbnailUrl}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Video URL *</label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.videoUrl ? "border-red-500" : "border-gray-300"}`}
              placeholder="https://example.com/video.mp4"
            />
            {errors.videoUrl && <p className="text-red-500 text-sm">{errors.videoUrl}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.category ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
            >
              {loading ? (editingVideo ? "Updating..." : "Uploading...") : (editingVideo ? "Update" : "Upload")}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-center font-medium text-green-600">{message}</p>}
      </div>
    </div>
  );
}
