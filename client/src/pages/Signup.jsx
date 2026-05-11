import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/index';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: form, 2: OTP verification
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setUserId(response.data.userId);
      toast.success('OTP sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTP({
        userId,
        otp,
      });
      toast.success('Email verified! You can now sign in.');
      navigate('/signin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-3xl">
              ₹
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Sign Up</h1>
          <p className="text-slate-600 text-center mb-8">Join Finance Tracker today</p>

          {step === 1 ? (
            // Registration Form
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.username ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.username && <p className="text-rose-500 text-sm mt-1">{errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.email ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && <p className="text-rose-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.password ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.password && <p className="text-rose-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.confirmPassword ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.confirmPassword && <p className="text-rose-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition mt-6"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            // OTP Verification
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-slate-600 text-center mb-4">Enter the 6-digit OTP sent to your email</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-2xl tracking-widest"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition mt-6"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                Back
              </button>
            </form>
          )}

          {/* Sign In Link */}
          {step === 1 && (
            <p className="text-center text-slate-600 mt-6">
              Already have an account?{' '}
              <Link to="/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
