import axios from "axios";
import { API_URL, token } from "../../utils";

export const fetchUsers = async ({ page, pageSize, filters }) => {
    try {

        const mtoken = localStorage.getItem(token);
        const params = {
            page: page + 1, // Convert 0-based index to 1-based for API
            limit: pageSize,
            filters: JSON.stringify(filters), // Pass filters as a JSON string
        };

        const response = await axios.get(API_URL + "/hospital/receptionist/list/users", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params
        });
        console.log(response);
        return {
            data: response.data.data,
            total: response.data.others.total,
            totalPages: response.data.others.totalPages,
            currentPage: response.data.others.currentPage - 1
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: [], total: 0, totalPages: 0, currentPage: 0 };
    }
};
