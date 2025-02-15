import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PropTypes from "prop-types";
import { API_URL, token } from "../utils";


const ExportButton = ({ endpoint, filename }) => {
    const [loading, setLoading] = useState(false);
    const mtoken = localStorage.getItem(token);

    const handleDownload = async () => {
        if (!endpoint) {
            alert('Will be activated soon')
            return false;
        }
        setLoading(true);
        try {
            const response = await fetch(API_URL + endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + mtoken,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${filename}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                console.error("Failed to download Excel file");
            }
        } catch (error) {
            console.error("An error occurred while downloading the file:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={handleDownload}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <FileDownloadIcon />}
            sx={{
                textTransform: "none",
                fontSize: "0.875rem",
            }}
        >
            {loading ? "Please wait..." : "Export"}
        </Button>
    );
};

ExportButton.propTypes = {
    endpoint: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
};

export default ExportButton;
