import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, User } from "lucide-react";
import Button from "../../components/UI/Button";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    role: "student" | "teacher" | "parent";
  }>({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      value: "student",
      label: "Student",
      description: "Access courses and track progress",
    },
    {
      value: "teacher",
      label: "Teacher",
      description: "Manage classes and create content",
    },
    {
      value: "parent",
      label: "Parent",
      description: "Monitor child's progress",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(
        formData.email,
        formData.password,
        formData.role
      );
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your IntelliLearn account
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <label
                    key={role?.value}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.role === role?.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role?.value}
                      checked={formData.role === role?.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as
                            | "student"
                            | "teacher"
                            | "parent",
                        })
                      }
                    />
                    <User className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {role?.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {role?.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
