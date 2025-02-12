// import React from 'react'

import DashboardInfoBox from "../../Components/DashboardInfoBox"

const Dashboard = () => {
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
                        <div className="col-span-3">
                            <DashboardInfoBox title={'Current Requests'} value={10} />
                        </div>
                        <div className="col-span-3">
                            <DashboardInfoBox title={'Current Doctors'} value={100} />
                        </div>
                        <div className="col-span-3">
                            <DashboardInfoBox title={'OPD'} value={10} />
                        </div>
                        <div className="col-span-3">
                            <DashboardInfoBox title={'App Users'} value={100} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
