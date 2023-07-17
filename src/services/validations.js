import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email("Email should be valid email"),
    password : yup.string().required("It is a required field")
  })
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  export const registerOwnerSchema = yup
  .object({
    first_name: yup.string().required("It is a required field"),
    last_name : yup.string().required("It is a required field"),
    email : yup.string().email("Email should be valid email").required("It is a required field"),
    phonenumber : yup.string().required("It is a required field").matches(phoneRegExp, 'Phone number is not valid').min(10, "too short")
    .max(10, "too long"),
  })


  export const registerOwnerSchema1 = yup
  .object({
    first_name: yup.string().required("It is a required field"),
    last_name: yup.string().required("It is a required field"),
    email : yup.string().email("Email should be valid email").required("It is a required field"),
    phonenumber : yup.string().required("It is a required field").matches(phoneRegExp, 'Phone number is not valid'),
  })

export const hotelSchema = yup
  .object({
    title: yup.string().required("This field is required"),
    content: yup.string().required("This field is required"),
    rating_standard:yup.string().required("This field is required"),
    author_id:yup.string().required("This field is required"),
    status:yup.string().required("This field is required"),
    map_latitude:yup.string().required("This field is required"),
    map_longitude:yup.string().required("This field is required"),
    selling_price:yup.string().required("This field is required"),
    price:yup.string().required("This field is required"),
  })

  export const amenitiesSchema = yup
  .object({
    title: yup.string().required("This field is required"),
    status:yup.string().required("This field is required"),
    icon:yup.string().required("This field is required"),
  })

  export const couponsSchema = yup
  .object({
    name: yup.string().required("This field is required"),
    code:yup.string().required("This field is required"),
    amount:yup.string().required("This field is required"),
    discount_type:yup.string().required("This field is required"),
    endate:yup.string().required("This field is required"),
    status:yup.string().required("This field is required"),
    minimumspend:yup.string().required("This field is required"),
    maximumspend:yup.string().required("This field is required"),
    usage_limit_per_coupon:yup.string().required("This field is required"),
    usage_limit_per_user:yup.string().required("This field is required"),
    icon:yup.string().required("This field is required"),
  })