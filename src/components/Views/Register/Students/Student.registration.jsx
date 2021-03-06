import { PrimaryButton, BaseButton } from '../../../UI/Form/Button/Button';
import { PrimaryInput } from '../../../UI/Form/Input/Input';
import { Icon } from '@iconify/react';
import './Student.registration.css'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import axios from '../../../../api/axios';

const StudentRegister = () => {
    const navigate = useNavigate();
    const validation = Yup.object({
        txtNombre: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required("Name Requiered"),
        txtApellido: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required("txtApellido Requiered"),
        txtEmail: Yup.string()
            .email("Invalid Email")
            .required("Email Requiered"),
        txtPassword: Yup.string()
            .min(8, "Password must be 8 character minimum")
            .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
                "Must Contain 8 characters, 1 uppercase, 1 lowercase, 1 number")
            .required("Password Requiered"),
        txtConfirmPassword: Yup.string()
            .oneOf([Yup.ref('txtPassword'), null], "Passwords must match")
    });

    const initial = {
        txtNombre: '',
        txtApellido: '',
        txtEmail: '',
        txtPassword: '',
        txtConfirmPassword: ''
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
         onSubmit: async values => {
            console.log(values);
            try {
                const data = await axios.post(
                    '/auth/student-signup',
                    {
                        name: values.txtNombre,
                        surname: values.txtApellido,
                        email: values.txtEmail,
                        password: values.txtPassword,
                        confirmPassword: values.txtConfirmPassword
                    }
                );
                console.log('Signup Request: ', data)
                navigate('/login');
            } catch (ex) {
                console.log('Error on Signup submit', ex);
                alert("Credenciales invalidas. Intente nuevas credenciales.");
            }
        },
    });

    const onLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/login')
    }

    return (
        <div className="container_signup">
            <div className="forms-container_signup">
                <div className="signup-form">
                    <form action="#" className="sign-in-form">
                        <h2 className="title_signup">Sign up</h2>
                        <div className="input-field_signup">
                            <i className="fas fa-user"></i>
                            <PrimaryInput
                                name="txtNombre"
                                value={formik.values.txtNombre} type="text"
                                placeholder="Nombre(s)"
                                error={formik.errors.txtNombre}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="input-field_signup">
                            <Icon className="fas fa-lock"></Icon>
                            <PrimaryInput
                                name="txtApellido"
                                value={formik.values.txtApellido}
                                type="text"
                                placeholder="Apellido(s)"
                                error={formik.errors.txtApellido}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="input-field_signup">
                            <Icon className="fas fa-lock"></Icon>
                            <PrimaryInput
                                name="txtEmail"
                                value={formik.values.txtEmail}
                                type="text"
                                placeholder="E-mail"
                                error={formik.errors.txtEmail}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="input-field_signup">
                            <Icon className="fas fa-lock"></Icon>
                            <PrimaryInput
                                name="txtPassword"
                                value={formik.values.txtPassword}
                                type="password"
                                placeholder="Password"
                                error={formik.errors.txtPassword}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="input-field_signup">
                            <Icon className="fas fa-lock"></Icon>
                            <PrimaryInput
                                name="txtConfirmPassword"
                                value={formik.values.txtConfirmPassword}
                                type="password"
                                placeholder="Confirm password"
                                error={formik.errors.txtConfirmPassword}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className='buttons_signup'>
                            <PrimaryButton type='submit' onClick={formik.handleSubmit} className="btn_signup" >
                                Signup
                            </PrimaryButton>
                            <div className='btn_caption_signup'>
                                <p className='info_signup'>Already have an account?</p>
                                <BaseButton onClick={onLogin} className="btn_signup btn2_signup" >
                                    login
                                </BaseButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container_signup">
                <div className="panel_signup left-panel_signup">
                    <div className="content_signup">
                        <h3>STUDENT</h3>
                        <p>
                            Create your account and review many teachers on our website. Everyone will see what you say about them and choose at their own expent!
                        </p>
                    </div>
                    <img src="/student.svg" className="image_signup" alt="" />
                </div>
            </div>
        </div>



    )
}

export default StudentRegister;