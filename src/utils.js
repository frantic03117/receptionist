export const BASE_URL = "https://consulto.packarts.in:8987";
export const API_URL = "https://consulto.packarts.in:8987";
export const token = "atoken";
export const LIVE_URL = "https://consulto.packarts.in:8987";
export const formcontrol = "w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none"
export const base_window_url = window.location.hostname;
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().slice(0, 16);
}
export const formatToDDMMYY = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
    const year = String(date.getFullYear()).slice(2);  // Get last two digits of the year
    return `${day}-${month}-${year}`;
}