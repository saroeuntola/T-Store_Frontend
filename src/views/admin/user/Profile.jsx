import React, { useEffect, useState } from "react";
import { Card, Button, TextInput, Label, Modal } from "flowbite-react";
import { updateUser, getUserById, updateProfile } from "config_API/User_api";
import Swal from "sweetalert2";
import { getAccessToken } from "service/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { urlUserImage } from "service/baseURL";

const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const token = getAccessToken();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id, token);
        
        if (response?.user) {
          setUser(response.user);
          setValue("username", response.user.username);
          setValue("email", response.user.email);
          setValue("sex", response.user.sex);
          setValue("phone", response.user.phone);
          setValue("address", response.user.address);
          setValue("profile", response.user.profile);
        }
        console.log(response.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
    if(!token){
        navigate('/login');
    }
  }, [id, setValue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select an image first!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("profile", selectedFile);

    try {
      const response = await updateProfile(token, id, formData);
      if (response) {
        Swal.fire("Success", "Profile picture updated!", "success");
        setUser((prev) => ({ ...prev, profile: response.updatedProfile }));
        setSelectedFile(null);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload image", "error");
    }
  };

const onSubmit = async (body) => {
  try {
    const response = await updateUser(token, id, body);
    if (response) {
      Swal.fire("Success", "Profile Updated Successfully", "success");
      setShowModal(false); // Close modal after saving
    }
  } catch (err) {
    console.error("Error updating profile:", err); // Log the error
    Swal.fire(
      "Error",
      err.response?.data?.message || "An error occurred",
      "error"
    );
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Section - Profile Picture */}
        <Card className="flex flex-col items-center p-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="mb-4 h-32 w-32 rounded-full object-cover"
            />
          ) : user?.profile ? (
            <img
              src={`${urlUserImage}${user.profile}`}
              alt="Profile"
              className="mb-4 h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="mb-4 h-32 w-32 text-gray-400" />
          )}
        </Card>

        {/* Right Section - Profile Information */}
        <Card className="p-4 md:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Profile Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Label>Username</Label>
            <TextInput disabled value={user.username || ""} />
            <Label>Email</Label>
            <TextInput disabled value={user.email || ""} />
            <Label>Phone</Label>
            <TextInput disabled value={user.phone || ""} />
          </div>
          <Button
            color="blue"
            onClick={() => setShowModal(true)}
            className="mt-4"
          >
            Edit Profile
          </Button>
        </Card>
      </div>

      {/* Modal for Editing Profile */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Label>Username*</Label>
              <TextInput {...register("username", { required: true })} />

              <Label>Email</Label>
              <TextInput {...register("email")} disabled />

              <Label>Phone</Label>
              <TextInput {...register("phone", { required: true })} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" color="blue">
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
