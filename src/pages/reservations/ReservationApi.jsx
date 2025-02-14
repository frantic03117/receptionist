import axios from "axios";
import { API_URL, token } from "../../utils";

export const fetchReservation = async ({ page, pageSize, filters }) => {
    try {

        const mtoken = localStorage.getItem(token);
        const params = {
            page: page + 1,
            limit: pageSize,
            filters: JSON.stringify(filters), 
        };

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
