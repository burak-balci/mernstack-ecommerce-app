import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, FieldArray } from "formik";
import newProductScheme from "./validations";
import { toast } from "react-hot-toast";

const NewProduct = () => {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        toast.success("The product has been successfully added.");
      },
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          type: "",
          photos: [],
        }}
        validationSchema={newProductScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-2 w-full items-center justify-center"
            >
              <div className="font-rob text-xl">Title</div>
              <input
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                disabled={isSubmitting}
                className="border-2 border-gray-500 w-1/3 p-1 rounded-lg"
              />
              {touched.title && errors.title && (
                <div className="text-red-500 font-bold">{errors.title}</div>
              )}
              <div className="font-rob text-xl">Type</div>
              <input
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
                disabled={isSubmitting}
                className="border-2 border-gray-500 w-1/3 p-1 rounded-lg"
              />
              {touched.type && errors.type && (
                <div className="text-red-500 font-bold">{errors.type}</div>
              )}
              <div className="font-rob text-xl">Description</div>
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                disabled={isSubmitting}
                className="border-2 border-gray-500 w-1/3 h-48 resize-none p-1 rounded-lg"
              />
              {touched.description && errors.description && (
                <div className="text-red-500 font-bold">
                  {errors.description}
                </div>
              )}
              <div className="font-rob text-xl">Price</div>
              <input
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                disabled={isSubmitting}
                className="border-2 border-gray-500 w-1/3 p-1 rounded-lg"
              />
              {touched.price && errors.price && (
                <div className="text-red-500 font-bold">{errors.price}</div>
              )}
              <FieldArray
                name="photos"
                render={(arrayHelpers) => (
                  <div className="w-1/3 flex flex-col justify-center ">
                    {values.photos &&
                      values.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="flex flex-row mt-2 justify-between items-center gap-x-2"
                        >
                          <input
                            name={`photos.${index}`}
                            value={photo}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            className="border-2 border-gray-500 w-full p-1 rounded-lg"
                          />
                          <button
                            className="border p-1 border-red-500 text-white bg-red-500 rounded-sm hover:bg-red-700 font-rob"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                    <button
                      className="mt-2 border p-1 bg-gray-500 hover:bg-gray-700 text-white rounded-sm border-gray-500 flex justify-center font-rob"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add a Photo
                    </button>
                  </div>
                )}
              />
              <button
                className="mt-2 border p-1 bg-green-600 hover:bg-green-800 w-1/3 text-white rounded-sm border-gray-500 flex justify-center font-rob"
                type="submit"
              >
                Save
              </button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default NewProduct;
