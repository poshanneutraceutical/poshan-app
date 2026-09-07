import { useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    Save,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./ChangePassword.css";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [show, setShow] = useState({

        current: false,

        new: false,

        confirm: false

    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setMessage("");

        try {

            await AuthService.changePassword(form);

            setMessage("Password changed successfully.");

            setTimeout(() => {

                navigate("/profile");

            }, 1500);

        }

        catch (err) {

            setError(

                err.response?.data ||

                "Unable to change password."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="change-password-page">

            <div className="change-password-card">

                <div className="change-password-header">

                    <h2>

                        Change Password

                    </h2>

                    <p>

                        Update your account password securely

                    </p>

                </div>

                {

                    message &&

                    <div className="success-message">

                        {message}

                    </div>

                }

                {

                    error &&

                    <div className="error-message">

                        {error}

                    </div>

                }

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>

                            Current Password

                        </label>

                        <div className="password-input">

                            <Lock size={18} />

                            <input

                                type={
                                    show.current
                                        ? "text"
                                        : "password"
                                }

                                name="currentPassword"

                                value={form.currentPassword}

                                onChange={handleChange}

                                required

                            />

                            <span

                                onClick={() =>
                                    setShow({
                                        ...show,
                                        current: !show.current
                                    })
                                }

                            >

                                {

                                    show.current

                                        ? <EyeOff size={18} />

                                        : <Eye size={18} />

                                }

                            </span>

                        </div>

                    </div>

                    <div className="input-group">

                        <label>

                            New Password

                        </label>

                        <div className="password-input">

                            <Lock size={18} />

                            <input

                                type={
                                    show.new
                                        ? "text"
                                        : "password"
                                }

                                name="newPassword"

                                value={form.newPassword}

                                onChange={handleChange}

                                required

                            />

                            <span

                                onClick={() =>
                                    setShow({
                                        ...show,
                                        new: !show.new
                                    })
                                }

                            >

                                {

                                    show.new

                                        ? <EyeOff size={18} />

                                        : <Eye size={18} />

                                }

                            </span>

                        </div>

                    </div>

                    <div className="input-group">

                        <label>

                            Confirm Password

                        </label>

                        <div className="password-input">

                            <Lock size={18} />

                            <input

                                type={
                                    show.confirm
                                        ? "text"
                                        : "password"
                                }

                                name="confirmPassword"

                                value={form.confirmPassword}

                                onChange={handleChange}

                                required

                            />

                            <span

                                onClick={() =>
                                    setShow({
                                        ...show,
                                        confirm: !show.confirm
                                    })
                                }

                            >

                                {

                                    show.confirm

                                        ? <EyeOff size={18} />

                                        : <Eye size={18} />

                                }

                            </span>

                        </div>

                    </div>

                    <div className="button-group">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={() => navigate("/profile")}

                        >

                            <ArrowLeft size={18} />

                            Back

                        </button>

                        <button

                            type="submit"

                            className="save-btn"

                            disabled={loading}

                        >

                            <Save size={18} />

                            {

                                loading

                                    ? "Updating..."

                                    : "Update Password"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default ChangePassword;