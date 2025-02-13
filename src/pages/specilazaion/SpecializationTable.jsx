import { Box, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
// import React from "react";

const SpecializationTable = ({ items }) => {
    // Define columns for the DataGrid
    const columns = [
        { field: "id", headerName: "Sr No", width: 100 },
        { field: "name", headerName: "Specialization", flex: 1, minWidth: 150 },
        { 
            field: "priority", 
            headerName: "Priority", 
            width: 130,
            renderCell: (params) => (
                <Chip 
                    label={params.value} 
                    color={params.value === 1 ? "success" : params.value === 2 ? "warning" : "error"}
                    variant="outlined"
                />
            )
        },
        { field: "doctor_count", headerName: "Doctors", width: 120 },
        { 
            field: "search_tags", 
            headerName: "Tags", 
            flex: 1, 
            minWidth: 200,
            renderCell: (params) => (
                <Typography variant="body2" className="text-wrap" color="textSecondary">
                    {params.value}
                </Typography>
            ) 
        },
        { 
            field: "created_at", 
            headerName: "Created At", 
            width: 180,
            renderCell: (params) => new Date(params.value).toLocaleDateString()
        }
    ];

    // Map the data and add an "id" field required by DataGrid
    const rows = items.map((itm, index) => ({
        id: index + 1,
        name: itm.name,
        priority: itm.priority,
        doctor_count: itm.doctor_count,
        search_tags: itm.search_tags,
        created_at: itm.created_at
    }));

    return (
        <Box sx={{ height: 500, width: "100%", p: 3, backgroundColor: "white", boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                Specializations List
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                
                sx={{ 
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1976d2", color: "black" },
                    "& .MuiDataGrid-row:nth-of-type(odd)": { backgroundColor: "#f5f5f5" }
                }}
            />
        </Box>
    );
};

export default SpecializationTable;

SpecializationTable.propTypes = {
    items : PropTypes.object
}
