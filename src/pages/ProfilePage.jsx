import useSWR from "swr";
import { deleteAvatar, getMyProfile, uploadAvatar } from "../api/auth.api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRef } from "react";
import demoImage from "../assets/default.webp";
import Spinner from "../components/common-component/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import EditProfileModal from "../components/modals/EditProfileModal";

export default function ProfilePage() {
  // const user = {
  //   name: "Amit Kaliyani",
  //   email: "amit@example.com",
  //   bio: "I love writing short motivational quotes ✍️",
  //   avatar: "https://i.pravatar.cc/155",
  //   totalQuotes: 12,
  //   joined: "Jan 2025",
  // };
  const ref = useRef();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState("");
  const [open, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { data, error, isLoading, mutate } = useSWR("my-profile", getMyProfile);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setApiError("");
      setLoading(true);
      await uploadAvatar(formData);
      setLoading(false);
      mutate();
      toast.success("Profile uploaded successfully");
    } catch (error) {
      console.log(error);
      setApiError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setDeleteApiError("");
      await deleteAvatar();
      mutate();
      toast.success("Profile deleted successfully");
    } catch (error) {
      setDeleteApiError(error?.response?.data?.message);
    }
  };

  const handleEdit = () => {
    setIsOpen(true);
    setProfileData(data?.data);
  };

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {error?.response?.data?.message ||
          (error.message && "Server is unavailable. Please try again later.")}
      </p>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[65vh]">
            <Spinner />
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
            {/* Avatar */}
            {loading ? (
              <div className="flex items-center justify-center w-24 h-24 rounded-full mx-auto border-4 border-purple-500 cursor-pointer">
                <Spinner />
              </div>
            ) : (
              <img
                src={data?.data?.avatar || demoImage}
                className="w-24 h-24  rounded-full object-cover  mx-auto border-4 border-purple-500 cursor-pointer"
              />
            )}

            {/* Name */}
            <div className="flex justify-center items-center mt-2 gap-3">
              <input
                type="file"
                name="avatar"
                id=""
                ref={ref}
                className="hidden"
                onChange={handleFileChange}
              />
              <FaEdit
                title="Upload Profile Image"
                className="cursor-pointer"
                onClick={() => ref.current.click()}
              />

              <FaTrash
                onClick={handleDeleteAvatar}
                title="Delete Profile Image"
                className={`${data?.data?.avatar ? "" : "hidden"}  cursor-pointer`}
              />
            </div>
            <p className="text-red-400 text-sm">{apiError || deleteApiError}</p>
            <h1 className="text-xl font-bold mt-4">{data?.data?.name}</h1>

            {/* Email */}
            <p className="text-gray-500 text-sm">{data?.data?.email}</p>

            {/* Bio */}
            <p className="text-gray-600 mt-3 text-sm">{data?.data?.bio}</p>

            {/* Stats */}
            <div className="flex justify-between mt-6 bg-gray-50 p-3 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Quotes</p>
                <p className="font-semibold">{data?.data?.quotes}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-semibold">{data?.data?.joined}</p>
              </div>
            </div>

            <button
              onClick={handleEdit}
              className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <EditProfileModal
        isOpen={open}
        setIsOpen={setIsOpen}
        profileData={profileData}
        setProfileData={setProfileData}
        mutate={mutate}
      />
    </>
  );
}
