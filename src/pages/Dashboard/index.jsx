import React from 'react'

import DashboardInfoBox from "../../Components/DashboardInfoBox"
import axios from 'axios';
import { API_URL, token } from '../../utils';

const Dashboard = () => {

    const [dinfos, setDinfos] = React.useState({
        "result": [],
        "totalDoctors": 0,
        "currentlyAvailableDoctor": 0,
        "noOfUsers": 0
    });
    const mtoken = localStorage.getItem(token);
    const getinfos = async () => {
        const resp = await axios.get(API_URL + '/hospital/receptionist/dashboard', {
            headers: {
                Authorization: "Bearer " + mtoken
            }
        });
        setDinfos(resp.data.data);
    };
    React.useEffect(() => {
        getinfos();
    }, []);

    return (
        <>
            <section className="bg-white shadow-lg shadow-gray-300 rounded-lg">
                <div className="container p-4">
                    <div className="w-full mb-6">
                        <h2 className="text-xl font-bold">
                            Analytics
                        </h2>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        {
                            Object.entries(dinfos).map(([k, v]) => (
                                typeof v !== "object" && (
                                    <div key={k} className="col-span-3">
                                        <DashboardInfoBox title={k} value={v} />
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
