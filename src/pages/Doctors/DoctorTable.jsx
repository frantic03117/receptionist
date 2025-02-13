import { useEffect, useState } from "react";
import { Box, Chip, Typography, Avatar, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { fetchDoctors } from "./api";  // Import the API function
import debounce from "lodash.debounce";
import { fetchDoctors } from "./DoctorApi";

const DoctorTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0); // MUI DataGrid uses 0-based index
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState([]);

    const handleFilterChange = (model) => {
        console.log("Filter Model:", model); // Debugging: Check what MUI sends
    
        if (!model.items || model.items.length === 0) {
            setFilters([]); // Reset filters if no filters are applied
            return;
        }
    
        const filterArray = model.items
            .filter((filter) => filter.field && filter.value) // Ensure valid filters
            .map((filter) => ({
                field: filter.field,  // 🔥 Use `field` instead of `columnField`
                operator: filter.operator || "contains", // Default operator
                value: filter.value,
            }));
    
        console.log("Processed Filters:", filterArray); // Debugging: Check extracted filters
    
        setFilters(filterArray);
        setPage(0); // Reset to first page when filters change
    };
    
    
    const [search, setSearch] = useState("");

    const loadDoctors = async () => {
        setLoading(true);
        const { data, total, currentPage } = await fetchDoctors({ page, pageSize, filters });

        // Ensure every row has an `id` property
        const formattedData = data.map((doctor) => ({
            id: doctor._id,
            ...doctor
        }));

        setDoctors(formattedData);
        setTotal(total);
        setPage(currentPage);
        setLoading(false);
    };

    // Fetch data on changes
    useEffect(() => {
        loadDoctors();
    }, [page, pageSize, filters]);

    // Debounce search input to avoid too many API calls
    const handleSearch = debounce((value) => {
        setSearch(value);
    }, 500);

    // Define columns for the DataGrid
    const columns = [
        { field: "id", headerName: "Sr No", width: 80 },
        {
            field: "image",
            headerName: "Profile",
            width: 100,
            renderCell: (params) => <Avatar src={params.value} alt="Doctor" />
        },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
        { field: "phone", headerName: "Phone", width: 120 },
        {
            field: "specializations",
            headerName: "Specializations",
            flex: 1,
            minWidth: 280,
            renderCell: (params) => (



                params.value.map((spec, index) => (
                    <>
                        <div className="text-wrap">
                            <Chip key={index} label={`${spec.specialization.name} - ₹${spec.price}`} color="primary" className="m-1" />
                        </div>
                    </>
                ))
            )
        },
        { field: "experience", headerName: "Experience (yrs)", width: 140 },
        { field: "ratings", headerName: "Ratings", width: 120 },
        { field: "reviews", headerName: "Reviews", width: 100 },
        {
            field: "is_active",
            headerName: "Active",
            width: 100,
            renderCell: (params) => (
                <Chip label={params.value ? "Active" : "Inactive"} color={params.value ? "success" : "error"} />
            )
        },
        {
            field: "is_verified",
            headerName: "Verified",
            width: 100,
            renderCell: (params) => (
                <Chip label={params.value ? "Yes" : "No"} color={params.value ? "success" : "warning"} />
            )
        },
        { field: "gender", headerName: "Gender", width: 100 },
        {
            field: "dob",
            headerName: "DOB",
            width: 150,
            renderCell: (params) => new Date(params.value).toLocaleDateString()
        },
    ];

    return (
        <Box sx={{ width: "100%", p: 3, backgroundColor: "white", boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                Doctors List
            </Typography>
            {/* Search Input */}
            <TextField
                label="Search by Name or Email"
                variant="outlined"
                fullWidth
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ mb: 2 }}
            />
            <DataGrid
                rows={doctors}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                paginationMode="server"
                rowCount={total}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                loading={loading}
                filterMode="server"
                onFilterModelChange={(model) => handleFilterChange(model)} 
                disableSelectionOnClick
                sx={{
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: "#fff", color: "black" },
                    "& .MuiDataGrid-row:nth-of-type(odd)": { backgroundColor: "#f5f5f5" }
                }}
            />
        </Box>
    );
};

export default DoctorTable;
