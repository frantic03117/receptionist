// import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <>
        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
            <section>
                <div className="@container mx-auto">
                    <div className="grid grid-cols-15">
                        <div className="col-span-3">
                            <div className="w-full">
                                <Sidebar />
                            </div>
                        </div>
                        <div className="col-span-12 bg-gray-100">
                            <div className="w-full p-2">
                                <Header />
                            </div>
                            <div className="w-full p-5">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Layout
