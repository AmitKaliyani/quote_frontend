import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { profileSchema } from "../../validators/profileSchema";
import { useEffect } from "react";
import { updateProfile } from "../../api/auth.api";

function EditProfileModal({
  isOpen,
  setIsOpen,
  profileData,
  //   setProfileData,
  mutate,
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsOpen(false);
      await updateProfile(data);
      await mutate();
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (profileData) {
      console.log(profileData);

      reset({
        name: profileData.name,
        bio: profileData.bio,
      });
    } else {
      reset({
        name: "",
        bio: "",
      });
    }
  }, [profileData]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-10 z-50 flex items-center justify-center  bg-black/30 backdrop-blur-sm p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl      
          rounded-2xl
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.15)]
          border
          border-purple-100
        "
      >
        <div className="flex items-center  justify-between rounded-2xl px-6 py-4  mb-5 bg-linear-to-r from-purple-600 to-violet-600">
          <div>
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              h-10
              w-10
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/30
              transition
              cursor-pointer
            "
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Profile Details
            </label>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Name
            </label>

            <input
              type="text"
              {...register("name")}
              placeholder="User name"
              className="
                w-full
                rounded-xl
                border
                border-purple-200
                px-4
                py-3
                outline-none
                transition
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
              "
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Bio
            </label>

            <input
              type="text"
              {...register("bio")}
              placeholder="User Bio"
              className="
                w-full
                rounded-xl
                border
                border-purple-200
                px-4
                py-3
                outline-none
                transition
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
              "
            />

            {errors.bio && (
              <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-300
                text-gray-700
                font-medium
                hover:bg-gray-100
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
               min-w-37.5
                px-5
                py-2.5
                rounded-xl
                bg-linear-to-r
                from-purple-600
                to-violet-600
                text-white
                font-semibold
                hover:opacity-90
                disabled:opacity-60
                transition
                cursor-pointer
              "
            >
              {isSubmitting ? (
                <div className="mx-auto h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Edit Details "
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
