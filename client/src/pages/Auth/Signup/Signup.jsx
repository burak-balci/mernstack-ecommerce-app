import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        toast.success("Your registration was successful.");
        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
        if (e.message == "Request failed with status code 409") {
          toast.error("User exists with this email.");
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center rounded-lg py-10 mx-auto border-2 mt-10 w-full lg:w-2/4">
      <form
        className=" flex flex-col gap-y-5 w-full items-center justify-center p-10"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-x-2 items-center w-full">
          <div className="flex flex-row gap-x-2 items-center w-full">
            <div className="w-2/3 font-rob text-md lg:text-xl">Email :</div>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email@email.com"
              className="outline-none border-2 border-gray-500 w-full p-1 rounded-lg"
            />
          </div>
          <div className="mt-2 font-rob text-lg text-red-500">
            {formik.touched.email && formik.errors.email}
          </div>
        </div>
        <div className="flex flex-col gap-x-2 items-center w-full">
          <div className="flex flex-row gap-x-2 items-center w-full">
            <div className="w-2/3 font-rob text-md lg:text-xl">Password :</div>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              className="outline-none border-2 border-gray-500 w-full p-1 rounded-lg"
            />
          </div>
          <div className="mt-2 font-rob text-lg text-red-500">
            {formik.touched.password && formik.errors.password}
          </div>
        </div>
        <div className="flex flex-col gap-x-2 items-center w-full">
          <div className="flex flex-row gap-x-2 items-center w-full">
            <div className="w-2/3 font-rob text-md lg:text-xl">
              Password Confirm :
            </div>
            <input
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              placeholder="Password Confirm"
              className="outline-none border-2 border-gray-500 w-full p-1 rounded-lg"
            />
          </div>
          <div className="mt-2 font-rob text-lg text-red-500">
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="border-2 rounded-md w-full text-2xl font-rob text-white bg-green-500 hover:bg-green-700  py-1 px-2"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
