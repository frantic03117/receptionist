// import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
// import loginbg from '../assets/images/loginbg.png'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import logo from '../assets/images/logo.png'

const Login = () => {
    return (
        <>
            <section className="loginbg">
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7">
                            <div className="w-full min-h-lvh flex items-center justify-center">
                                <div className="w-full ">

                                    {/* <img src={loginbg} alt="" className="w-[400px] me-auto" /> */}
                                </div>

                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="w-full p-10 h-full min-h-lvh flex justify-center items-center">
                                <div className="w-full bg-white rounded-lg p-10 shadow-md shadow-gray-800">
                                    <div className="form-group flex justify-start mb-5 items-center">
                                        <img src={logo} alt="" className="w-[150px]" />
                                    </div>
                                    <div className="form-group mb-5">
                                        <TextField
                                            id="email"
                                            label="Enter Email"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaEnvelope />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="form-group mb-5">
                                        <TextField
                                            id="password"
                                            label="Enter Password"
                                            variant="outlined"
                                            type="password"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaLock />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        {/* <Button size='large' className='!bg-primary' variant='contained' fullWidth>Login</Button> */}
                                        <button className="w-full bg-[var(--primary)] py-3 cursor-pointer active:bg-[var(--primary)] active:opacity-60 text-white rounded-lg">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
