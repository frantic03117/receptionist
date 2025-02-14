// import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils";

const DoctorCard = ({ doctor, bookDoctor }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6 flex flex-col items-center text-center">
      {/* Profile Image */}
      <img
        className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
        src={doctor.image?.file ? BASE_URL +"/"+ doctor.image.file : "https://via.placeholder.com/100"}
        alt={doctor.name}
      />
      
      {/* Doctor Name & Specialization */}
      <h2 className="text-xl font-semibold mt-3">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specializations.map(s => s.specialization.name).join(", ")}</p>
      
      {/* Experience & MCI Number */}
      <p className="text-gray-500 text-sm mt-2">Experience: {doctor.experience} years</p>
      <p className="text-gray-500 text-sm">MCI Number: {doctor.mci_number}</p>
      
      {/* Hospital Details */}
      {doctor.hospitals && doctor.hospitals.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Hospital:</h3>
          <p className="text-gray-700">{doctor.hospitals[0].name}, {doctor.hospitals[0].city}</p>
        </div>
      )}
      
      {/* Contact Information */}
      <div className="mt-4 w-full">
        <p className="text-sm text-gray-600">📧 {doctor.email}</p>
        <p className="text-sm text-gray-600">📞 {doctor.phone}</p>
      </div>
      
      {/* Specialization Prices */}
      <div className="mt-4 w-full">
        <h3 className="text-lg font-medium">Consultation Fees:</h3>
        {doctor.specializations.map((spec) => (
          <p key={spec._id} className="text-gray-700 text-sm">
            {spec.specialization.name}: ₹{spec.price}
          </p>
        ))}
      </div>
      
      {/* Button */}
      <button onClick={() => bookDoctor(doctor._id)} className="mt-5 bg-[var(--primary)] text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;


DoctorCard.propTypes = {
    doctor : PropTypes.object,
    bookDoctor : PropTypes.func
}