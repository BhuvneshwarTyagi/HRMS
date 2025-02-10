import React, { useContext } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaIdCard, FaUser, FaUniversity, FaPhoneVolume, FaBriefcase } from 'react-icons/fa';
import AuthContext from '../Context/AuthContext';

const UserProfile = () => {
  // Mock data based on the provided schema
  const { authState } = useContext(AuthContext);
  const userDetails = authState.userDetails;

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-2xl text-blue-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600">{label}</h3>
        <p className="text-lg text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="h-fit w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full mx-auto">
        <div className="w-full text-center mb-4">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Employee Profile
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Detailed information about {userDetails.Name}
          </p>
        </div>
        <div className="bg-white  shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="text-center flex items-center gap-4">
              <div className="inline-block p-4 rounded-full bg-white shadow-lg mb-4">
                <img className="text-5xl text-blue-500" alt='img' src={`${userDetails.profile_picture}`} />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-3xl font-bold text-white">{userDetails.Name}</h2>
                <p className="text-blue-100 mt-1">
                  {userDetails.HR ? "HR Access Granted" : "Employee"}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-6 p-8">
            <DetailItem
              icon={<FaEnvelope />}
              label="Email"
              value={userDetails.email}
            />
            <DetailItem
              icon={<FaPhone />}
              label="Contact"
              value={userDetails.contact}
            />
            <DetailItem
              icon={<FaIdCard />}
              label="Aadhaar"
              value={userDetails.Aadhaar}
            />
            <DetailItem
              icon={<FaIdCard />}
              label="PAN"
              value={userDetails.PAN}
            />
            <DetailItem
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={userDetails.address}
            />
            <DetailItem
              icon={<FaUniversity />}
              label="Bank Details"
              value={userDetails.bank_details}
            />
            <DetailItem
              icon={<FaPhoneVolume />}
              label="Emergency Contact"
              value={userDetails.emergency_contact}
            />
            {userDetails.HR && (
              <DetailItem
                icon={<FaBriefcase />}
                label="Role"
                value="Human Resources"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;