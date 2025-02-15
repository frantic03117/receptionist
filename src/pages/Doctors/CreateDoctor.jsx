import React from 'react';
import { Box, Grid, TextField, Typography, Button, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { API_URL, token } from '../../utils';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import { Link, useParams } from 'react-router-dom';


const CreateDoctor = () => {
    const { id } = useParams();
    const [specializations, setSpacializations] = React.useState([]);
    const mtoken = localStorage.getItem(token);
    const [selectedIds, setSelectedIds] = React.useState([]);
    const [loading, setLoding] = React.useState(false);

    const getdoctor = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/doctor-details?doctor=" + id, {
            headers: {
                Authorization: "Bearer " + mtoken
            }
        });
        if (!resp.data.error) {
            //setDoctor(resp.data.data);
            const rob = resp.data.data;
            const spcdata = rob.specializations;

            const obj = {
                name: rob.name,
                phone: rob.phone,
                email: rob.email,
                about_me: rob.about_me,
                blood_group: rob.blood_group,
                dob: rob.dob,

                experience: rob.experience,
                gender: rob.gender,
                mci_number: rob.mci_number,


            }
            let arr = [];
            spcdata.forEach(itm => {
                arr.push({ specialization: itm.specialization._id, price: itm.price });
            });
            console.log(arr);
            setSelectedIds(arr);
            setFormValues(obj);
        }
    }
    const handleCheckboxChange = (itm) => {

        setSelectedIds((prevSelected) => {
            const exists = prevSelected.find((item) => item.specialization == itm._id);

            if (exists) {
                return prevSelected.filter((item) => item.specialization != itm._id);
            } else {
                return [...prevSelected, { specialization: itm._id, price: 0 }];
            }
        });
    };
    const handlePriceChange = (e, itm) => {
        const { value } = e.target;
        setSelectedIds((prevSelected) =>
            prevSelected.map((item) =>
                item.specialization === itm._id ? { ...item, price: Number(value) } : item
            )
        );
    };
    const [formValues, setFormValues] = React.useState({});
    const [image, setImage] = React.useState(null);
    const getspecializations = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/specialization", {
            headers: {
                Authorization: "Bearer " + mtoken
            }
        });
        setSpacializations(resp.data.data);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoding(true);
        const fdata = new FormData();
        Object.entries(formValues).map(([k, v]) => {
            fdata.append(k, v);
        });
        if (image) {
            fdata.append('image', image);
        }
        selectedIds.forEach((item, index) => {
            fdata.append(`specializations[${index}][specialization]`, item.specialization);
            fdata.append(`specializations[${index}][price]`, item.price);
        });
        if (id) {
            fdata.append('_id', id);
        }
        let resp;
        if (id) {
            resp = await axios.put(API_URL + "/hospital/receptionist/update_doctor", fdata, {
                headers: {
                    Authorization: "Bearer " + mtoken
                }
            });
        } else {
            resp = await axios.post(API_URL + "/hospital/receptionist/add_doctor", fdata, {
                headers: {
                    Authorization: "Bearer " + mtoken
                }
            });
        }

        setLoding(false);
        if (!resp.data.error) {
            toast.success('Doctor created successfully');
            setFormValues({});
        }
        if (resp.data.error) {
            toast.error('Doctor created failed');
        }

    };
    const handleProfileImage = (e) => {
        setImage(e.target.files[0]);
    }
    React.useEffect(() => {
        getspecializations();
    }, []);
    React.useEffect(() => {
        if (id) {
            getdoctor();
        }

    }, [id]);

    return (
        <>

            {
                loading ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>

                        <Box
                            boxShadow={4}
                            borderRadius={4}
                            sx={{ backgroundColor: 'white', p: 5 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                                        Create Doctor
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} textAlign={'end'}>
                                    <Link to={'/doctors'} className="px-4 py-2 bg-[var(--primary)] text-white rounded text-xs">All Doctors</Link>
                                </Grid>
                            </Grid>


                            <form autoComplete='off' onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item md={3} xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Enter Name"
                                            name="name"

                                            size='small'
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            size='small'
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            type="tel"
                                            size='small'
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Gender"
                                            name="gender"
                                            size='small'
                                            value={formValues.gender}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        >
                                            <MenuItem selected={formValues.gender == "Male"} value="Male">Male</MenuItem>
                                            <MenuItem selected={formValues.gender == "Female"} value="Female">Female</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Experience (years)"
                                            name="experience"
                                            type="number"
                                            size='small'
                                            value={formValues.experience}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                        <TextField
                                            fullWidth
                                            label="MCI Number"
                                            name="mci_number"
                                            type="text"
                                            size='small'
                                            value={formValues.mci_number}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Blood Group"
                                            name="blood_group"
                                            type="text"
                                            size='small'
                                            value={formValues.blood_group}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={6}>

                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            name="dob"
                                            type="date"
                                            size='small'
                                            value={formValues.dob}
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12}>

                                        <TextField
                                            id="outlined-number"
                                            label="Profile Image"
                                            type="file"
                                            size='small'
                                            onChange={handleProfileImage}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} xs={12}>

                                        <TextField
                                            fullWidth
                                            id="about_me"
                                            label="About me"
                                            type="text"
                                            name='about_me'
                                            value={formValues.about_me}
                                            size='small'
                                            onChange={handleInputChange}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="w-full  max-h-60 overflow-y-auto">


                                            <table className='w-full'>
                                                <thead>
                                                    <tr className='*:text-start'>
                                                        <th>Sr</th>
                                                        <th>Specialization</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        specializations.map((itm, index) => (
                                                            <>
                                                                <tr className=''>
                                                                    <td>{index + 1}</td>
                                                                    <td className='p-2'>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={selectedIds.some(
                                                                                        (item) => item.specialization === itm._id
                                                                                    )}
                                                                                    onChange={() => handleCheckboxChange(itm)}
                                                                                />
                                                                            }
                                                                            label={itm.name}
                                                                        />
                                                                    </td>
                                                                    <td className='p-2'>
                                                                        <input
                                                                            type="number"
                                                                            className="w-full disabled:bg-gray-300 border max-w-40 border-[var(--primary)] outline-none p-3 rounded"
                                                                            onChange={(e) => handlePriceChange(e, itm)}
                                                                            value={selectedIds.find(
                                                                                (item) => item.specialization == itm._id
                                                                            )?.price}
                                                                            disabled={!selectedIds.some(
                                                                                (item) => item.specialization === itm._id
                                                                            )}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            sx={{ mt: 2 }}
                                        >
                                            Create Doctor
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </>
                )
            }
        </>
    );
};

export default CreateDoctor;
