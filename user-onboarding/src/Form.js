import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name' />
                {touched.name && errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                
                <Field type='text' name='email' placeholder='Email' />
                {touched.email && errors.email && (
                    <p className='error'>{errors.email}</p>
                )}

                <Field type='text' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}

                <Field component='select' className='student-select' name='status'>
                    <option>Select Student Status</option>
                    <option value='full-time'>Full-Time</option>
                    <option value='part-time'>Part-Time</option>
                </Field>
                {touched.status && errors.status && (
                    <p className='error'>{errors.status}</p>
                )}

                <label className='checkbox-container'>
                    Terms of Service
                    <Field
                        type='checkbox'
                        name='tos'
                        checked={values.tos}
                    />
                    <span className='checkmark' />
                </label>
                {touched.tos && errors.tos && (
                    <p className='error'>{errors.tos}</p>
                )}

                <button type='submit'>Submit</button>
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Student Status: {user.status}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, status, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            status: status || '',
            tos: tos || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please enter your name.'),
        email: Yup.string().email().required('Please enter your email.'),
        password: Yup.string().min(8).required('Please enter valid password.'),
        status: Yup.string().oneOf(['full-time', 'part-time']).required('Please select student status.'),
        tos: Yup.boolean().required('Please accept terms of service.')
    }),

    handleSubmit(values, { setStatus }) {
        console.log(values)
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    },
})(UserForm);

export default FormikUserForm;