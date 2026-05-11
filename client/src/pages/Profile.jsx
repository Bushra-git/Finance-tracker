import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import OTPModal from '../components/OTPModal';
import { userAPI } from '../api/index';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.user);
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/signin';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Profile</h1>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <div className="px-4 py-3 bg-slate-100 rounded-lg border border-slate-300">
                <p className="text-slate-900 font-medium">{profile?.username}</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="px-4 py-3 bg-slate-100 rounded-lg border border-slate-300">
                <p className="text-slate-900 font-medium">{profile?.email}</p>
              </div>
            </div>

            {/* Password (Masked) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="px-4 py-3 bg-slate-100 rounded-lg border border-slate-300">
                <p className="text-slate-900 font-medium">••••••••</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Account created on{' '}
              {new Date(profile?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <OTPModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onVerify={() => {
          toast.success('Password changed successfully');
          setShowChangePasswordModal(false);
        }}
        title="Change Password"
      />
    </div>
  );
};

export default Profile;
