import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Geçerli bir email girin").required("Zorunlu alan"),
  password: yup.string().required(),
});

export default validations;
