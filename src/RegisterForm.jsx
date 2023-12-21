import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RegisterForm = () => {
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email(),
        password: yup
            .string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'Password must not exceed 30 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        phoneNumber: yup
            .string()
            .required('Phone number is required')
            .matches(/^\+?\d{10,12}$/, 'Invalid phone number'),
        country: yup.string().required('Country is required'),
        zipCode: yup
            .string()
            .required('Zip code is required')
            .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid zip code'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name</label>
                    <input type="text" {...register('name')} style={{ width: '100%', padding: '5px' }} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input type="email" {...register('email')} style={{ width: '100%', padding: '5px' }} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input type="password" {...register('password')} style={{ width: '100%', padding: '5px' }} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Confirm Password</label>
                    <input type="password" {...register('confirmPassword')} style={{ width: '100%', padding: '5px' }} />
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Phone Number</label>
                    <input type="text" {...register('phoneNumber')} style={{ width: '100%', padding: '5px' }} />
                    {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Country</label>
                    <select {...register('country')} style={{ width: '100%', padding: '5px' }}>
                        <option value="">Select a country</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="Ukraine">Ukraine</option>
                    </select>
                    {errors.country && <p style={{ color: 'red' }}>{errors.country.message}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Zip Code</label>
                    <input type="text" {...register('zipCode')} style={{ width: '100%', padding: '5px' }} />
                    {errors.zipCode && <p style={{ color: 'red' }}>{errors.zipCode.message}</p>}
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
