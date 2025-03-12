import React from 'react'
import { useRazorpay } from "react-razorpay";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material"
import axios from 'axios';
import { API_URL, token } from '../../utils';
import { useApp } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
    const { Razorpay } = useRazorpay();
    const [doctors, setDoctors] = React.useState([]);
    const [doc_id, setDocId] = React.useState('');
    const [sdate, setSdate] = React.useState('');
    const mtoken = localStorage.getItem(token);
    const [slots, setSlots] = React.useState([]);
    const [slot_id, setSlotId] = React.useState('');
    const [udata, setUdata] = React.useState({});
    const [spcl, setSpcl] = React.useState('');
    const [order, setOrder] = React.useState(false);
    const { settings } = useApp();
    const rozkey = settings.find(obj => obj.key == "banking_key")?.value;
    const navigate = useNavigate();
    const consultantfee = settings.find(obj => obj.key == "appointment_fees")?.value;
    const handlePayment = async () => {

        const options = {
            key: rozkey,
            amount: order?.amount,
            currency: "INR",
            name: "Consulto Online hospitals APP",
            description: "Consulto Online App",
            order_id: order.razorpay_order_id,
            handler: (response) => {
                updatePaymentGateway(response);
            },
            prefill: {
                name: udata?.user_name,
                email: "demo@test.com",
                contact: udata?.user_phone,
            },
            theme: {
                color: "#F37254",
            },
        };
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    }
    const updatePaymentGateway = async (data) => {
        const udata = {
            order_id: order.order_id,
            ...data
        }
        const resp = await axios.put(API_URL + "/hospital/receptionist/update-payment-of-reservation", udata, {
            headers: {
                Authorization: "Bearer " + mtoken
            },
        });
        if (!resp.data.error) {
            navigate('/consultants');
        }
        console.log(resp);
    }
    React.useEffect(() => {
        if (order) {
            handlePayment();
        }

    }, [order])

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
            "consultation_fees": consultantfee,
            "payment_status": "Success"
        }
        const resp = await axios.post(API_URL + "/hospital/receptionist/store-reservation", data, {
            headers: {
                Authorization: "Bearer " + mtoken
            },
        });
        if (!resp.data.error) {
            setOrder(resp.data.data);
            // toast.success('Appointment fixed');
            // setSlots([]);
            // setUdata({});
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
    const handleSelectSlot = (itm) => {
        if (itm.label == "Available") {
            setSlotId(itm._id);
        } else {
            alert('Please select valid slot')
        }

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
    const getbgcolor = (itm) => {
        if (slot_id == itm._id) {
            return 'bg-green-600 text-white';
        }
        if (itm.label == "Reserved") {
            return 'bg-blue-700 text-white';
        }
        if (itm.label == "Blocked") {
            return 'bg-red-700 text-white';
        }
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
                                            <Grid onClick={() => handleSelectSlot(itm)} item className={`p-2 cursor-pointer text-xs border border-[var(--primary)] ${getbgcolor(itm)}`} lg={2} xs={2}>
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
