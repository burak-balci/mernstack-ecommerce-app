import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        toast.success("You have successfully logged in.");
        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
        if (e.message == "Request failed with status code 401") {
          toast.error("Your username or password is incorrect.");
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
        <div className="flex flex-row gap-x-2 items-center w-full">
          <div className="w-2/3 font-rob text-md lg:text-xl">Email :</div>
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            placeholder="Email@email.com"
            className="outline-none border-2 border-gray-500 w-full p-1 rounded-lg"
          />
        </div>
        <div className="flex flex-row gap-x-2 items-center w-full">
          <div className="w-2/3 font-rob text-md lg:text-xl">Password :</div>
          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            placeholder="Password"
            className="outline-none border-2 border-gray-500 w-full p-1 rounded-lg"
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="border-2 rounded-md w-full text-2xl font-rob text-white bg-green-500 hover:bg-green-700  py-1 px-2"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
