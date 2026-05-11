import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { userAPI } from '../api/index';

const OTPModal = ({ isOpen, onClose, onVerify, title = 'Verify OTP' }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: send OTP, 2: verify OTP, 3: new password

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await userAPI.sendOTP();
      toast.success('OTP sent to your email');
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }
    setStep(3);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await userAPI.changePassword({ otp, newPassword });
      toast.success('Password changed successfully');
      onVerify?.();
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpSent(false);
    setStep(1);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {step === 1 && (
            <>
              <p className="text-slate-600">Click the button below to receive an OTP on your email.</p>
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-2xl tracking-widest"
                />
              </div>
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Verify OTP
              </button>
              <button
                onClick={handleSendOTP}
                className="w-full text-emerald-600 hover:underline font-medium"
              >
                Resend OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
