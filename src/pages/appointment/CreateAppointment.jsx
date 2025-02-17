import React from 'react'

import { Box, Button, Grid, MenuItem, TextField } from "@mui/material"
import axios from 'axios';
import { API_URL, token } from '../../utils';

const CreateAppointment = () => {
    const [doctors, setDoctors] = React.useState([]);
    const [doc_id, setDocId] = React.useState('');
    const [sdate, setSdate] = React.useState('');
    const mtoken = localStorage.getItem(token);
    const getdoctors = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/list/doctors", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
        });
        setDoctors(resp.data.data);
    }
    const handleDocid = (value) => {
        setDocId(value)
    }
    React.useEffect(() => {
        getdoctors();
    }, []);
    return (
        <>
            <Box className="p-4 bg-white" borderRadius={3} boxShadow={3}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            select
                            fullWidth
                            label="Select Doctor"
                            name="doctor"
                            size='small'
                            onChange={handleDocid}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        >
                            {
                                doctors.filter(itm => itm.is_active).map(itm => (
                                    <>
                                        <MenuItem value={itm._id}>{itm.name}</MenuItem>
                                    </>
                                ))
                            }


                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <Button disabled={!doc_id || !sdate} variant="contained" color="primary.main">Get slots</Button>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}

export default CreateAppointment
