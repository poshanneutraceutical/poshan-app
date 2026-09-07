 import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post(
        "/auth/forgot-password",
        {
          email
        }
      );

      setSuccess(
        response.data.message ||
          "Password reset link sent successfully."
      );

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <Mail
            className="mx-auto mb-3"
            size={42}
          />

          <h1 className="text-2xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your registered email to
            receive a password reset link.
          </p>
        </div>

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;