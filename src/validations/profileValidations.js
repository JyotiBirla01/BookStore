import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  address: yup.string().required('Address is required'),
  gender: yup.string().required('Gender is required'),
});
