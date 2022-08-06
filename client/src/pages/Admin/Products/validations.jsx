import * as yup from "yup";

const newProductScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  type: yup.string().required(),
  price: yup.string().required(),
  type: yup.string().required(),
});

export default newProductScheme;
