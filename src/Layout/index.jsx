import React from 'react'
import { token } from '../utils';
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Loader from '../Components/Loader';
import { useApp } from '../AppContext';
const Layout = () => {
    const navigate = useNavigate();
    const { side } = useApp();
    const { pathname } = useLocation();
    const [loading, setLoading] = React.useState(true);
    const gettoken = () => {
        setLoading(true);
        const mtoken = localStorage.getItem(token);
        if (!mtoken) {
            navigate('/login');
        }
        setLoading(false);
    }
    React.useEffect(() => {
        gettoken();
    }, [pathname]);

    return (
        <>
            {
                loading ? (
                    <>
                        <Loader />
                    </>
                ) : (
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
                                    <div className={`${side ? 'col-span-1' : 'col-span-3'}`}>
                                        <div className="w-full sticky top-0">
                                            <Sidebar />
                                        </div>
                                    </div>
                                    <div className={`${side ? 'col-span-14' : 'col-span-12'} bg-gray-100`}>
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
        </>
    )
}

export default Layout
