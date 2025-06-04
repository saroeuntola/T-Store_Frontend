import { useForm } from "react-hook-form";
import {useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { getAccessToken } from "service/Auth";
import { useEffect } from "react";
import { UpdateCategory } from "config_API/category_api";
import { getCategoryById } from "config_API/category_api";
import Swal from "sweetalert2";
import InfoUser from "config_API/infoUser";

const EditCategory = () => {
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();
    const curUser = InfoUser(); 
    const token = getAccessToken();
    const {id} = useParams();

     useEffect(() => {
       const fetchCategory = async () => {
         try {
           const response = await getCategoryById(token,id);
           if (response?.category) {
             const userData = response.category;
             setValue("name", userData.name);
             if (curUser?.username) {
                setValue("username", curUser.username);
                setValue("user_id", curUser.id);
              }
           }
           console.log(response.category)
         } catch (error) {
           console.error("Error fetching user or roles:", error);
         }
       };
       fetchCategory();
     }, [curUser,id, token, setValue]);
  
    const onSubmit = async (body) => {
      try {
        const response = await UpdateCategory(token,id,body);
        if (response?.category) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Category Edit Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(response)
        navigate("/admin/category");
      } catch (err) {
        Swal.fire({
          title: "Oops",
          text: err.response?.data?.message || "An error occurred",
          icon: "error",
        });
      }
    };

  return (
    <main className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl bg-white px-6 py-16 shadow-xl shadow-gray-700 sm:w-8/12 sm:px-10 md:w-6/12 lg:w-4/12">
        <h4 className="mb-4 text-center text-3xl font-bold text-navy-700 dark:text-white sm:text-4xl">
          Edit Category
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Category Name Input */}
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              type="text"
              placeholder="Category Name"
              {...register("name", { required: "Category Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

      
          <div className="mb-4">
        
            <TextInput
              type="hidden"
              placeholder="Username"
              readOnly
              {...register("username")}
            />

            <input type="hidden" {...register("user_id")} />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="linear mt-4 w-full bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
};

export default EditCategory;
