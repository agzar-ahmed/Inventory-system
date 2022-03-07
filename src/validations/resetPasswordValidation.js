import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  email:yup.string().required('Please Enter your email'),
  password:  yup.string()
                .required('Please Enter your password')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Lowercase, One Number and One Special Case Character"
                ),
  confirmPassword: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
  })
  });
