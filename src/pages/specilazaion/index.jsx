import axios from 'axios';
import React from 'react'
import { API_URL, token } from '../../utils';
import { useLocation } from 'react-router-dom';
import SpecializationTable from './SpecializationTable';

const Specialization = () => {
    const { pathname } = useLocation();
    const mtoken = localStorage.getItem(token);
    const [items, setItems] = React.useState([]);

    const getitems = async () => {
        const resp = await axios.get(API_URL + "/hospital/receptionist/specialization", {
            headers: {
                Authorization: "Bearer " + mtoken
            }
        });
        setItems(resp.data.data);
    }
    React.useEffect(() => {
        getitems();

    }, [pathname]);
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="w-full">
                                <SpecializationTable items={items} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Specialization