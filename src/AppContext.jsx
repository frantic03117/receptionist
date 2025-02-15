import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { API_URL, token } from "./utils";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [loading, setLoading] = React.useState(true);
    const [admin, setUser] = React.useState(null);
    const [side, setSide] = React.useState(false);
    const handleSide = () => {
        setSide(!side);
    }
    const mtoken = localStorage.getItem(token);
    const fetchAdmin = async () => {
        try {
            if (mtoken) {
                setLoading(true);
                const resp = await axios.get(API_URL + "/hospital/user", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + mtoken
                    }
                });
                setUser(resp.data.data);
            }
        } catch (err) {
            // localStorage.clear();
            console.log(err);

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchAdmin();

    }, [])
    return (
        <AppContext.Provider value={{ admin, loading, handleSide, side }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext);
}



AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};