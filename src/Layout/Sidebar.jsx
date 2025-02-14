// import React from 'react'
import { MdDashboard, MdTypeSpecimen } from 'react-icons/md'
// import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import SideLink from '../Components/SideLink'
import { FaHeartPulse, FaUserDoctor } from 'react-icons/fa6'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <div className="w-full bg-black relative h-lvh overflow-y-auto">
                <div className="w-full mb-5 p-3 border-b border-gray-400">
                    <img src={logo} alt="" className="w-[60px] mx-auto bg-[var(--primary)]  rounded" />
                </div>
                <ul className=' ps-4 pe-10 pt-0 m-0 *:mb-2'>
                    <li>
                        <h4 className="text-md text-gray-400 font-semibold">General</h4>
                    </li>
                    <li>
                        <SideLink title={'Dashboard'} url={'/dashboard'} icon={<MdDashboard />} />
                    </li>
                  
                    <li>
                        <SideLink title={'Specializations'} url={'specialization'} icon={<MdTypeSpecimen />} />
                    </li>
                    <li>
                        <SideLink title={'Consultants'} url={'consultants'} icon={<FaHeartPulse />} />
                    </li>
                    <li>
                        
                        <h4 className="text-md text-gray-400 font-semibold">Doctors</h4>
                    </li>
                    <li>
                        <SideLink title={'List Doctors'} url={'doctors'} icon={<FaUserDoctor />} />
                    </li>
                    <li>
                        <SideLink title={'List Users'} url={'users'} icon={<FaUserDoctor />} />
                    </li>
                </ul>
                <div className="w-full border-t bg-[var(--primary)] border-gray-400 px-4 py-2 absolute bottom-0 start-0">
                    <ul>
                        <li className='ps-3'>
                            <button onClick={logout} className="flex  text-white gap-3 justify-between">
                                <span className="text-xl">
                                    <IoIosLogOut />
                                </span>
                                <span>
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
