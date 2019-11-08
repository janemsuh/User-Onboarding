import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, handleChange }) => {
    return (
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name' />
                <Field type='text' name='email' placeholder='Email' />
                <Field type='text' name='password' placeholder='Password' />
                <Field component='select' className='student-select' name='status'>
                    <option>Select Student Status</option>
                    <option value='full-time'>Full-Time</option>
                    <option value='part-time'>Part-Time</option>
                </Field>
                <label className='checkbox-container'>
                    Terms of Service
                    <Field
                        type='checkbox'
                        name='tos'
                        checked={values.tos}
                    />
                    <span className='checkmark' />
                </label>
                <button type='submit'>Submit</button>
            </Form>
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

    handleSubmit(values) {
        console.log(values)
    },
})(UserForm);

export default FormikUserForm;

console.log('This is the HOC', FormikUserForm);