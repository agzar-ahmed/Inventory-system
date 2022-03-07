import * as yup from 'yup';

export const sendResetPasswordSchema = yup.object({
  email:yup.string().email().required('Please Enter your email'),
  });
