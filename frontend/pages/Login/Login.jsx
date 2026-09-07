import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import "./Login.css";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [form, setForm] = useState({

        username: "",

        password: "",

        rememberMe: false

    });


    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


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


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");


        try {

            const response =
                await AuthService.login({

                    username:
                        form.username,

                    password:
                        form.password

                });


            let roles = [];


            if (Array.isArray(response.roles)) {

                roles = response.roles
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


            const primaryRole =
                roles.length > 0
                    ? roles[0]
                    : "";


            /*
             ==========================================
             USER DATA
             ==========================================
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


            login(
                userData,
                response.token
            );


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
                "Invalid username or password."
            );


        } finally {

            setLoading(false);

        }

    };


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
                                            !showPassword
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


                    <div className="login-options">

                        <label>

                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={
                                    form.rememberMe
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={loading}
                            />

                            {" "}
                            Remember Me

                        </label>

                    </div>


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