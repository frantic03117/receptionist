import React from 'react'

import { Box, Button, Grid, MenuItem, TextField } from "@mui/material"
import axios from 'axios';
import { API_URL, token } from '../../utils';
import { toast } from 'react-toastify';

const CreateAppointment = () => {
    const [doctors, setDoctors] = React.useState([]);
    const [doc_id, setDocId] = React.useState('');
    const [sdate, setSdate] = React.useState('');
    const mtoken = localStorage.getItem(token);
    const [slots, setSlots] = React.useState([]);
    const [slot_id, setSlotId] = React.useState('');
    const [udata, setUdata] = React.useState({});
    const [spcl, setSpcl] = React.useState('');
    const handleUdata = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setUdata((prev) => ({
            ...prev,
            [key]: value
        }));
    }
    const saveAppointment = async () => {
        const data = {
            ...udata,
            "date": sdate,
            "slot": slot_id,
            "hospital": doctors.find(itm => itm._id == doc_id)?.hospitals[0],
            "doctor": doc_id,
            "specialization": spcl,
            "appointment_fees": doctors.find(itm => itm._id == doc_id)?.specializations.find(obj => obj.specialization._id == spcl)?.price,
            "consultation_fees": 200,
            "payment_status": "Success"
        }
        const resp = await axios.post(API_URL + "/hospital/receptionist/store-reservation", data, {
            headers: {
                Authorization: "Bearer " + mtoken
            },
        });
        if (!resp.data.error) {
            toast.success('Appointment fixed');
            setSlots([]);
            setUdata({});
        }
    }

    const getslots = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/doctor-slot", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params: {
                doctor: doc_id,
                date: sdate
            }
        });
        setSlots(resp.data.misc);
    }
    const handleSelectSlot = (id) => {
        setSlotId(id);
    }
    const getdoctors = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/list/doctors", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
        });
        setDoctors(resp.data.data);
    }
    const handleDocid = (e) => {
        setDocId(e.target.value)
        console.log(e.target.value)
    }
    React.useEffect(() => {
        getdoctors();
    }, []);
    return (
        <>
            <Box className="p-4 bg-white" borderRadius={3} boxShadow={3}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            select
                            fullWidth
                            label="Select Doctor"
                            name="doctor"
                            size="small"
                            onChange={handleDocid}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        >
                            {doctors.filter(itm => itm.is_active).map(itm => (
                                <MenuItem key={itm._id} value={itm._id}>
                                    {itm.name}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid>
                    {
                        doc_id && (
                            <>


                                <Grid item xs={3}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Select Problem"
                                        name="specialization"
                                        size="small"
                                        value={spcl}
                                        onChange={(e) => setSpcl(e.target.value)}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    >
                                        {doctors.find(itm => itm._id == doc_id)?.specializations.map(itm => (
                                            <MenuItem key={itm.specialization._id} value={itm.specialization._id}>
                                                {itm.specialization.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Grid>
                            </>
                        )
                    }
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Select Appointment Date"
                            name="date"
                            type="date"
                            size='small'
                            value={sdate}
                            onChange={(e) => setSdate(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={getslots} disabled={!doc_id || !sdate} variant="contained" color="primary.main">Get slots</Button>
                    </Grid>
                </Grid>

            </Box>
            {
                slots.length > 0 && (
                    <>
                        <Box className="p-4 mt-5 bg-white" borderRadius={3} boxShadow={3}>
                            <Grid container gap={1}>
                                {
                                    slots.map(itm => (
                                        <>
                                            <Grid onClick={() => itm.label == "Available" && handleSelectSlot(itm._id)} item className={`p-2 cursor-pointer text-xs border border-[var(--primary)] ${slot_id == itm._id ? 'bg-[var(--primary)] text-white' : itm.blocked ? 'bg-red-500 text-white' : itm.label == "Reserved" ? 'bg-blue-700 text-white' : ''}`} lg={2} xs={2}>
                                                {itm.name}
                                            </Grid>
                                        </>
                                    ))
                                }
                                <Grid item lg={12} ></Grid>
                                <Grid item lg={3} >
                                    <TextField
                                        fullWidth
                                        label="Enter Name"
                                        name="user_name"
                                        type="text"
                                        size='small'
                                        onChange={handleUdata}

                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={3} >
                                    <TextField
                                        fullWidth
                                        label="Enter Phone Number"
                                        name="user_phone"
                                        type="text"
                                        size='small'
                                        onChange={handleUdata}

                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={saveAppointment} variant="contained" color="primary.main">Submit</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )
            }
        </>
    )
}

export default CreateAppointment
