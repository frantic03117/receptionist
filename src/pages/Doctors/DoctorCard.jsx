// import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils";
import { GrUserExpert } from "react-icons/gr";
import { AiFillMediumCircle } from "react-icons/ai";

const DoctorCard = ({ doctor, bookDoctor, reservation }) => {
  return (
    <div className="w-full *:!text-xs rounded-2xl p-4 overflow-hidden shadow-lg bg-white">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
            src={doctor.image?.file ? BASE_URL + "/" + doctor.image.file : "https://via.placeholder.com/100"}
            alt={doctor.name}
          />
        </div>
        <div className="col-span-8 ">
          <h2 className="text-xl font-semibold mt-3">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specializations.map(s => s.specialization.name).join(", ")}</p>
          <div className="flex gap-4">
            <span className="inline-flex gap-3">
              <GrUserExpert /> : {doctor.experience}
            </span>
            <span className="inline-flex gap-3">
              <AiFillMediumCircle /> : {doctor.mci_number}
            </span>
          </div>
        </div>

        <div className="col-span-6">
          <h4 className="font-bold text-[var(--primary)]">Contact Details</h4>
          <div className=" w-full">
            <p className="text-xs text-gray-600">{doctor.email}</p>
            <p className="text-xs text-gray-600">{doctor.phone}</p>
          </div>
        </div>
        <div className="col-span-6">
          <div className="w-full">
            <h4 className="font-bold text-[var(--primary)]">Fee Details</h4>
            <div className="w-full">
              {doctor.specializations.filter(itm => itm.specialization._id == reservation.specialization?._id).map((spec) => (
                <>
                  <p key={spec._id} className="text-gray-700 text-xs">
                    {spec.specialization.name}: ₹{spec.price}
                  </p>
                </>

              ))}
            </div>
          </div>

        </div>
        <div className="col-span-12">
          <button onClick={() => bookDoctor(doctor._id)} className="mt-5 w-full bg-[var(--primary)] text-white px-4 py-2 rounded-full hover:opacity-80">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;


DoctorCard.propTypes = {
  doctor: PropTypes.object,
  reservation: PropTypes.object,
  bookDoctor: PropTypes.func
}