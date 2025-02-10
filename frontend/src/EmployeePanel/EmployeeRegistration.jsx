import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaUniversity, FaExclamationCircle, FaCamera, FaLock, FaBuilding } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    contact: '',
    email: '',
    Aadhaar: '',
    PAN: '',
    bank_details: '',
    emergency_contact: '',
    address: '',
    profile_picture: '',
    HR: false,
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Employee Profile</CardTitle>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {formData.profile_picture ? (
                    <img
                      src="/api/placeholder/128/128"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser size={48} className="text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700"
                  >
                    <FaCamera size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Full Name"
                      disabled={!isEditing}
                      value={formData.Name}
                      onChange={(e) => setFormData({...formData, Name: e.target.value})}
                    />
                    <FaUser className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Contact Number"
                      disabled={!isEditing}
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    />
                    <FaPhone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Email Address"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <FaEnvelope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Documents & Bank Details */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Aadhaar Number"
                      disabled={!isEditing}
                      value={formData.Aadhaar}
                      onChange={(e) => setFormData({...formData, Aadhaar: e.target.value})}
                    />
                    <FaIdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="PAN Number"
                      disabled={!isEditing}
                      value={formData.PAN}
                      onChange={(e) => setFormData({...formData, PAN: e.target.value})}
                    />
                    <FaIdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Bank Account Details"
                      disabled={!isEditing}
                      value={formData.bank_details}
                      onChange={(e) => setFormData({...formData, bank_details: e.target.value})}
                    />
                    <FaUniversity className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <div className="relative">
                  <input
                    type="text"
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Emergency Contact"
                    disabled={!isEditing}
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                  />
                  <FaExclamationCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <textarea
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Full Address"
                    rows="3"
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <FaBuilding className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hr-checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.HR}
                  onChange={(e) => setFormData({...formData, HR: e.target.checked})}
                  disabled={!isEditing}
                />
                <label htmlFor="hr-checkbox" className="text-sm font-medium text-gray-700">
                  HR Access
                </label>
              </div>

              {isEditing && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Change Password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <FaLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfile;