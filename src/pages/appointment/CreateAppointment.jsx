// import React from 'react'

import { Box, Button, Grid, MenuItem, TextField } from "@mui/material"

const CreateAppointment = () => {
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


                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Select Appointment Date"
                            name="date"
                            type="date"
                            size='small'

                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary.main">Get slots</Button>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}

export default CreateAppointment
