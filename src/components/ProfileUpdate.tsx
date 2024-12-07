import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchProfileById, updateProfile } from '../services/ProfileServices';
import { Profile } from '../Contract/Profile';

const ProfileUpdate: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (id) {
                try {
                    const data = await fetchProfileById(Number(id));
                    setProfile(data);
                    // console.log('fetch', data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        loadProfile();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            name: profile?.name || '',
            email: profile?.email || '',
            age: profile?.age || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            age: Yup.number().nullable().positive('Age must be a positive number').integer('Age must be an integer'),
        }),
        onSubmit: async (values) => {
            if (id) {
                try {
                    const updatedValues = {
                        ...values,
                        age: values.age ? Number(values.age) : null,
                    };

                    await updateProfile(Number(id), updatedValues);
                    navigate('/');
                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            }
        },

    });

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow" style={{ width: '500px' }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Update Profile</h4>
                </div>
                <div className="card-body">
                    {profile ? (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label float-start">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="invalid-feedback">{formik.errors.name.toString()}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label float-start">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="invalid-feedback">{formik.errors.email.toString()}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label float-start">Age (optional)</label>
                                <input
                                    type="number"
                                    name="age"
                                    onChange={formik.handleChange}
                                    value={formik.values.age || ''}
                                    className={`form-control ${formik.errors.age && formik.touched.age ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.age && formik.errors.age && (
                                    <div className="invalid-feedback">{formik.errors.age.toString()}</div>
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
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p>Loading profile data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
