import axios from "axios";
import { API_URL, token } from "../../utils";

export const fetchReservation = async ({ page, pageSize, filters, time_period }) => {
    try {

        const mtoken = localStorage.getItem(token);
        const params = {
            page: page + 1,
            limit: pageSize,

        };
        if (time_period != "0") {
            params['date_filter'] = "1"
            params['time_period'] = time_period
        }
        filters.forEach(itm => {
            params[itm.field] = itm.value
        })

        const response = await axios.get(API_URL + "/hospital/receptionist/reservation_list", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params
        });
        console.log(response);
        return {
            data: response.data?.data,
            total: response.data.others?.total,
            totalPages: response.data.others?.totalPages,
            currentPage: response.data.others?.currentPage - 1
        };
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return { data: [], total: 0, totalPages: 0, currentPage: 0 };
    }
};
export const fetchReservation_withStatus = async ({ page, pageSize, filters, time_period, status = 'DoctorAccept' }) => {
    try {

        const mtoken = localStorage.getItem(token);
        const params = {
            page: page + 1,
            limit: pageSize,
            status: status

        };
        if (time_period != "0") {
            params['date_filter'] = "1"
            params['time_period'] = time_period
        }
        filters.forEach(itm => {
            params[itm.field] = itm.value
        })

        const response = await axios.get(API_URL + "/hospital/receptionist/reservation_list", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params
        });
        console.log(response);
        return {
            data: response.data?.data,
            total: response.data.others?.total,
            totalPages: response.data.others?.totalPages,
            currentPage: response.data.others?.currentPage - 1
        };
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return { data: [], total: 0, totalPages: 0, currentPage: 0 };
    }
};
