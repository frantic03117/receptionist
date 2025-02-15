import axios from 'axios';
import React, { useEffect } from 'react'
import { API_URL, token } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorCard from '../Doctors/DoctorCard';
import { toast } from 'react-toastify';
import BackButton from '../../Components/BackButton';
import { Alert } from '@mui/material';
import Loader from '../../Components/Loader';

const AcceptReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = React.useState();
  const [doctors, setDoctors] = React.useState([]);
  const [slot, setSlot] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const mtoken = localStorage.getItem(token);
  const navigate = useNavigate();
  const bookDoctor = async (docid) => {
    const data = {
      "_id": id,
      "status": "DoctorAccept",
      "doctor_id": docid
    }
    const resp = await axios.put(API_URL + "/hospital/receptionist/change-status", data, {
      headers: {
        Authorization: "Bearer " + mtoken
      }
    });
    if (!resp.data.error) {
      toast.success('Accepted successfully');
      navigate('/consultants')
    }
  }
  const getResDetails = async () => {
    setLoading(true)
    const resp = await axios.get(API_URL + "/hospital/receptionist/reservation-details?_id=" + id, {
      headers: {
        Authorization: "Bearer " + mtoken
      }
    });
    setSlot(resp.data.others)
    setReservation(resp.data.data);

  }
  const getdoctors = async () => {
    setLoading(true)
    const rsp = await axios.get(API_URL + "/hospital/receptionist/available-doctor-list", {
      headers: {
        Authorization: "Bearer " + mtoken
      },
      params: {
        request_id: id,
        date: reservation.date,
        slot: slot?._id
      }
    });
    setDoctors(rsp.data.data);
    setLoading(false)
  }
  React, useEffect(() => {
    getResDetails();
  }, []);
  React, useEffect(() => {

    getdoctors();
    console.log(reservation)

  }, [reservation]);
  const ignoreLead = async () => {
    if (confirm('Are you sure ?')) {


      const data = {
        "_id": id,
        "status": "IgnoredBy",
      }
      const resp = await axios.put(API_URL + "/hospital/receptionist/change-status", data, {
        headers: {
          Authorization: "Bearer " + mtoken
        }
      });
      if (!resp.data.error) {
        toast.success('Accepted successfully');
        navigate('/consultants')
      }
    }
  }
  return (
    <>
      {
        loading ? (
          <>
            <section className="h-lvh flex justify-center items-center">
              <Loader />
            </section>
          </>
        ) : (
          <>

            <section>
              <div className="container">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 mb-8">
                    <div className="w-full text-end">
                      <BackButton />
                    </div>
                  </div>
                  <div className="col-span-12">
                    {
                      doctors.length == 0 && (
                        <>
                          <Alert severity="warning" className='shadow-lg shadow-amber-700 border border-amber-600'>
                            No doctor available <button onClick={ignoreLead} className='text-amber-900 underline font-bold'>Ignore This</button>
                          </Alert>

                        </>
                      )
                    }
                  </div>
                  {
                    doctors.map(itm => (
                      <>
                        <div className="col-span-4">
                          <DoctorCard reservation={reservation} bookDoctor={bookDoctor} doctor={itm} />
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
    </>
  )
}

export default AcceptReservation