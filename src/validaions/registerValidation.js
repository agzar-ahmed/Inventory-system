import * as yup from 'yup';

export const RegisterSchema = yup.object({
  firstName:yup.string().required('Please Enter your firstName'),
  lastName:yup.string().required('Please Enter your lastName'),
  email:yup.string().required('Please Enter your email'),
  password:  yup.string()
                .required('Please Enter your password')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Lowercase, One Number and One Special Case Character"
                ),
  confirmPassword: yup.string()
                    // .test('passwords-match', 'Passwords must match', function(value){
                    //     return console.log(this.parent.password === value)
                    // })
  });
