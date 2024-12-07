import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProfile } from '../services/ProfileServices';

const ProfileForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be atleast 3 characters')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            age: Yup.number()
                .nullable()
                .transform((value, originalValue) => {
                    if (typeof originalValue === 'string' && originalValue.trim() === '') {
                        return null;
                    }
                    return value;
                })
                .positive('Age must be a positive number')
                .integer('Age must be an integer'),
        }),

        onSubmit: async (values) => {
            try {
                const profileData = {
                    name: values.name,
                    email: values.email,
                    age: values.age ? Number(values.age) : null,
                };
                const createdProfile = await createProfile(profileData);
                console.log('Profile created successfully:', createdProfile);
                alert('Profile created successfully!');
                navigate('/');
            } catch (error) {
                console.error('Error creating profile:', error);
                alert('Failed to create profile. Please try again.');
            }
        },

    });

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow" style={{ width: '500px' }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Create Profile</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label float-start">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className={`form-control ${formik.errors.name ? 'is-invalid' : ''
                                    }`}
                            />
                            {formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className={`form-control ${formik.errors.email ? 'is-invalid' : ''
                                    }`}
                            />
                            {formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">Age (optional)</label>
                            <input
                                type="number"
                                name="age"
                                onChange={formik.handleChange}
                                value={formik.values.age}
                                className={`form-control ${formik.errors.age ? 'is-invalid' : ''
                                    }`}
                            />
                            {formik.errors.age && (
                                <div className="invalid-feedback">{formik.errors.age}</div>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
