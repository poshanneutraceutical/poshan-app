import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import initializePushNotifications
    from "../../services/pushNotificationService";

import "./Login.css";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    /*
    ============================================================
    FORM
    ============================================================
    */

    const [form, setForm] = useState({

        username: "",

        password: "",

        rememberMe: true

    });


    /*
    ============================================================
    STATE
    ============================================================
    */

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    /*
    ============================================================
    INPUT CHANGE
    ============================================================
    */

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setForm((previousForm) => ({

            ...previousForm,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };


    /*
    ============================================================
    LOGIN
    ============================================================
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        setError("");


        try {

            /*
            ====================================================
            CALL BACKEND LOGIN API
            ====================================================
            */

            const response =
                await AuthService.login({

                    username:
                        form.username.trim(),

                    password:
                        form.password

                });


            /*
            ====================================================
            VALIDATE TOKEN
            ====================================================
            */

            if (!response?.token) {

                throw new Error(
                    "Login succeeded but no authentication token was received."
                );

            }


            /*
            ====================================================
            ROLES
            ====================================================
            */

            let roles = [];


            if (Array.isArray(response.roles)) {

                roles =
                    response.roles
                        .map((role) => {

                            if (
                                typeof role === "string"
                            ) {

                                return role
                                    .replace(
                                        "ROLE_",
                                        ""
                                    )
                                    .toUpperCase();

                            }


                            if (
                                role &&
                                typeof role === "object"
                            ) {

                                return (
                                    role.name ||
                                    role.authority ||
                                    ""
                                )
                                    .replace(
                                        "ROLE_",
                                        ""
                                    )
                                    .toUpperCase();

                            }


                            return "";

                        })
                        .filter(Boolean);

            }


            /*
            ====================================================
            FALLBACK ROLE
            ====================================================
            */

            if (
                roles.length === 0 &&
                typeof response.role === "string"
            ) {

                roles = [

                    response.role
                        .replace(
                            "ROLE_",
                            ""
                        )
                        .toUpperCase()

                ];

            }


            /*
            ====================================================
            PRIMARY ROLE
            ====================================================
            */

            const primaryRole =
                roles.length > 0
                    ? roles[0]
                    : "";


            /*
            ====================================================
            USER DATA
            ====================================================
            */

            const userData = {

                id:
                    response.userId,

                username:
                    response.username,

                name:
                    response.name,

                employeeId:
                    response.employeeId,

                roles:
                    roles,

                role:
                    primaryRole,

                position:
                    response.position || null

            };


            console.log(
                "Logged In User:",
                userData
            );


            /*
            ====================================================
            IMPORTANT

            AuthContext.login() stores both:

                token -> localStorage
                user  -> localStorage

            Therefore closing/reopening the ERP does not remove
            the login information.

            Logout still removes them normally.
            ====================================================
            */

            login(
                userData,
                response.token
            );


            /*
            ====================================================
            PUSH REGISTRATION

            Do NOT request permission automatically here.

            If notification permission has already been granted,
            Firebase can register the device immediately.

            If permission is still "default", the NotificationBell
            will request permission later from the user's click.

            The Firebase installation/device registration is stored
            on the backend against this ERP user, so it can receive
            push notifications even while the ERP page is closed.
            ====================================================
            */

            try {

                await initializePushNotifications({

                    requestPermission: false,

                    userId:
                        userData.id

                });

            } catch (pushError) {

                /*
                 * Push failure must NOT prevent the user from
                 * entering the ERP.
                 */

                console.error(
                    "Push initialization after login failed:",
                    pushError
                );

            }


            /*
            ====================================================
            SAVE LOGIN PREFERENCE

            We do NOT save the password.

            Authentication itself is persisted through the JWT
            and user information stored by AuthContext/AuthService.
            ====================================================
            */

            localStorage.setItem(
                "poshan-remember-me",
                "true"
            );


            /*
            ====================================================
            OPEN DASHBOARD
            ====================================================
            */

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );


        } catch (err) {

            console.error(
                "Login Error:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid username or password."
            );


        } finally {

            setLoading(false);

        }

    };


    /*
    ============================================================
    RENDER
    ============================================================
    */

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>
                        Poshan ERP
                    </h1>

                    <p>
                        Sign in to continue
                    </p>

                </div>


                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                >

                    {/* =================================================
                        USERNAME
                    ================================================= */}

                    <div className="login-form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            autoComplete="username"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="login-form-group">

                        <label>
                            Password
                        </label>


                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />


                            <span
                                className="password-toggle"
                                onClick={() => {

                                    if (!loading) {

                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        );

                                    }

                                }}
                            >

                                {showPassword ? (

                                    <EyeOff
                                        size={20}
                                    />

                                ) : (

                                    <Eye
                                        size={20}
                                    />

                                )}

                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        REMEMBER ME
                    ================================================= */}

                    <div className="login-options">

                        <label>

                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={
                                    form.rememberMe
                                }
                                onChange={handleChange}
                                disabled={loading}
                            />

                            {" "}
                            Remember Me

                        </label>

                    </div>


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >

                        <LogIn
                            size={18}
                        />

                        {" "}

                        {loading
                            ? "Signing In..."
                            : "Sign In"}

                    </button>

                </form>

            </div>

        </div>

    );

};


export default Login;