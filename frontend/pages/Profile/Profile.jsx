import { useEffect, useState } from "react";
import {
    UserCircle,
    Mail,
    Shield,
    User,
    Hash
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);

    const [editForm, setEditForm] = useState({

        name: "",

        email: ""

    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data =
                await AuthService.getCurrentUser();

            setUser(data);

        }

        catch (error) {

            console.error(
                "Profile loading failed:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };

    const openEditModal = () => {

        setEditForm({

            name: user?.name || "",

            email: user?.email || ""

        });

        setShowEditModal(true);

    };

    const closeEditModal = () => {

        setShowEditModal(false);

    };

    const handleInputChange = (e) => {

        setEditForm({

            ...editForm,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdateProfile = async () => {

        try {

            setSaving(true);

            const updatedUser =
                await AuthService.updateProfile(editForm);

            setUser(updatedUser);

            // Update local storage

            AuthService.saveUser({

                ...AuthService.getUser(),

                name: updatedUser.name,

                email: updatedUser.email

            });

            setShowEditModal(false);

        }

        catch (error) {

            console.error(
                "Profile update failed:",
                error
            );

            alert("Unable to update profile.");

        }

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div
                style={{
                    padding: "40px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "600"
                }}
            >

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <UserCircle
                        size={110}
                        className="profile-avatar"
                    />

                    <h2>

                        {user?.name}

                    </h2>

                    <p>

                        {user?.username}

                    </p>

                </div>

                <div className="profile-details">

                    <div className="profile-row">

                        <User size={18} />

                        <span>Name</span>

                        <strong>

                            {user?.name}

                        </strong>

                    </div>

                    <div className="profile-row">

                        <Hash size={18} />

                        <span>User ID</span>

                        <strong>

                            {user?.id}

                        </strong>

                    </div>

                    <div className="profile-row">

                        <Mail size={18} />

                        <span>Email</span>

                        <strong>

                            {user?.email || "Not Available"}

                        </strong>

                    </div>

                    <div className="profile-row">

                        <Shield size={18} />

                        <span>Role</span>

                        <strong>

                            {user?.roles?.join(", ")}

                        </strong>

                    </div>

                </div>

                <div className="profile-actions">

                    <button

                        className="profile-btn"

                        onClick={openEditModal}

                    >

                        Edit Profile

                    </button>

                    <button

                        className="password-btn"

                        onClick={() =>
                            navigate("/change-password")
                        }

                    >

                        Change Password

                    </button>

                </div>

            </div>

            {showEditModal && (

                <div className="profile-modal-overlay">

                    <div className="profile-modal">

                        <h2>

                            Edit Profile

                        </h2>

                        <div className="profile-input-group">

                            <label>

                                Name

                            </label>

                            <input

                                type="text"

                                name="name"

                                value={editForm.name}

                                onChange={handleInputChange}

                            />

                        </div>

                        <div className="profile-input-group">

                            <label>

                                Email

                            </label>

                            <input

                                type="email"

                                name="email"

                                value={editForm.email}

                                onChange={handleInputChange}

                            />

                        </div>

                        <div className="profile-modal-actions">

                            <button

                                className="cancel-btn"

                                onClick={closeEditModal}

                            >

                                Cancel

                            </button>

                            <button

                                className="save-btn"

                                onClick={handleUpdateProfile}

                                disabled={saving}

                            >

                                {

                                    saving

                                        ? "Saving..."

                                        : "Save Changes"

                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default Profile;