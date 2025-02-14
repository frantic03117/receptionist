import axios from 'axios';
import React, { useEffect } from 'react'
import { API_URL, token } from '../../utils';
import {  useParams } from 'react-router-dom';
import DoctorCard from '../Doctors/DoctorCard';

const AcceptReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = React.useState();
  const [doctors, setDoctors] = React.useState([]);
  const mtoken = localStorage.getItem(token);
  const bookDoctor = async (docid) => {
    const data = {
      "_id" : id,
      "status" : "DoctorAccept",
      "doctor_id" : docid
    }
    const resp = await axios.put(API_URL + "/hospital/receptionist/change-status", data, {
      headers : {
        Authorization: "Bearer " + mtoken
      }
    });
    console.log(resp);
  }
  const getResDetails = async () => {
    const resp = await axios.get(API_URL + "/hospital/receptionist/reservation-details?_id=" + id, {
      headers: {
        Authorization: "Bearer " + mtoken
      }
    });
    setReservation(resp.data.data);
  }
  const getdoctors = async () => {
    const rsp = await axios.get(API_URL + "/hospital/receptionist/available-doctor-list", {
      headers: {
        Authorization: "Bearer " + mtoken
      },
      params: {
        request_id: id,
        date: reservation.date,
        slot: reservation.slot._id
      }
    });
    setDoctors(rsp.data.data);
  }
  React, useEffect(() => {
    getResDetails();
  }, []);
  React, useEffect(() => {
    if (reservation) {
      getdoctors();
      console.log(reservation)
    }
  }, [reservation]);
  return (
    <>
      <section>
        <div className="container">
          <div className="grid grid-cols-12">
            {
              doctors.map(itm => (
                <>
                  <div className="col-span-4">
                      <DoctorCard bookDoctor={bookDoctor} doctor={itm} />
                  </div>
                </>
              ))
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default AcceptReservation