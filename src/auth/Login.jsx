import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
// import loginbg from '../assets/images/loginbg.png'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils'

const Login = () => {
    const [fdata, setFdata] = React.useState({ phone: '', password: '' });
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        setLoading(true);
        const resp = await axios.post(`${API_URL}/hospital/user/login`, fdata);
        if (resp.data.data) {
            localStorage.setItem('atoken', resp.data.data.token);
            setStatus(resp.data.success);
            setMsg(resp.data.message);
            setLoading(false);
            navigate('/dashboard');
        }else{
            setMsg('Invalid credentials');
            setStatus('0');
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFdata((prev) => ({
            ...prev,
            [name]: value
        }));
    };
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
                                    {
                                        msg && (
                                            <>
                                                <div className={`w-full my-5 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                                    <div className="w-full rounded-md p-4 text-white">
                                                        {msg}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className="form-group mb-5">
                                        <TextField
                                            id="phone"
                                            label="Enter Phone Number"
                                            variant="outlined"
                                            name='phone'
                                            fullWidth
                                            onChange={handleInputChange}
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
                                            name='password'
                                            onChange={handleInputChange}
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
                                        <button onClick={handleLogin} disabled={!fdata?.phone || !fdata.password} className="w-full disabled:bg-gray-600 bg-[var(--primary)] py-3 cursor-pointer active:bg-[var(--primary)] active:opacity-60 text-white rounded-lg">
                                            {loading ? '....Please Wait' : 'Login Now'}
                                        </button>
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
