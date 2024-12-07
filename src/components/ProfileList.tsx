import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfiles, deleteProfile } from "../services/ProfileServices";
import { Profile } from "../Contract/Profile";

const ProfileList = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null);
    const navigate = useNavigate();

    // Fetching the profile lists
    useEffect(() => {
        const loadProfiles = async () => {
            try {
                const data = await fetchProfiles();
                setProfiles(data);
            } catch (error) {
                console.error("Failed to fetch profiles:", error);
            }
        };

        loadProfiles();
    }, []);

    // Handling delete profile
    const handleDelete = async () => {
        if (profileToDelete) {
            try {
                await deleteProfile(profileToDelete.id);
                setProfiles(profiles.filter(profile => profile.id !== profileToDelete.id));
                setShowModal(false);
            } catch (error) {
                console.error("Failed to delete profile:", error);
            }
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="float-end">
                    <Link to="profile-create">
                        <button className="btn btn-primary">Create Profile</button>
                    </Link>
                </div>
            </div>
            <br />
            <br />
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.slice().reverse().map((profile) => (
                            <tr key={profile.id}>
                                <td>{profile.id}</td>
                                <td>{profile.name}</td>
                                <td>{profile.email}</td>
                                <td>{profile.age}</td>
                                <td style={{ width: "150px" }}>
                                    <div className="d-flex justify-content-center">
                                        <span
                                            className="bg-info text-white p-2 rounded-circle me-2"
                                            title="View"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() => navigate('/view')}
                                        >
                                            <i className="bi bi-eye-fill"></i>
                                        </span>
                                        <span
                                            className="bg-warning text-white p-2 rounded-circle me-2"
                                            title="Edit"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() => navigate(`profile-update/${profile.id}`)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </span>
                                        <span
                                            className="bg-danger text-white p-2 rounded-circle"
                                            title="Delete"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() => {
                                                setProfileToDelete(profile);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this profile? This action cannot be undone.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileList;
