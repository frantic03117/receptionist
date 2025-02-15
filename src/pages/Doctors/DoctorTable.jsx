import { useEffect, useState } from "react";
import { Box, Chip, Typography, Avatar, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchDoctors } from "./DoctorApi";
import { Link } from "react-router-dom";

const DoctorTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState([]);
    const handleFilterChange = (model) => {
        if (!model.items || model.items.length === 0) {
            setFilters([]); // Reset filters if no filters are applied
            return;
        }
        const filterArray = model.items
            .filter((filter) => filter.field && filter.value) // Ensure valid filters
            .map((filter) => ({
                field: filter.field,
                operator: filter.operator || "contains", // Default operator
                value: filter.value,
            }));
        setFilters(filterArray);
        setPage(0); // Reset to first page when filters change
    };

    const loadDoctors = async () => {

        setLoading(true);
        const { data, total, currentPage } = await fetchDoctors({ page, pageSize, filters });
        const formattedData = data.map((doctor, index) => ({
            sr: index + 1,
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


    // Define columns for the DataGrid
    const columns = [
        { field: "sr", headerName: "Sr No", width: 80, filterable: false },
        {
            field: "image",
            headerName: "Profile",
            width: 100,
            filterable: false,
            sortable: false,
            renderCell: (params) => <Avatar src={params.value} alt="Doctor" />
        },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
        { field: "phone", headerName: "Phone", width: 120, sortable: false, },
        { field: "gender", headerName: "Gender", width: 100 },
        {
            field: "specializations",
            headerName: "Specializations",
            flex: 1,
            minWidth: 280,
            filterable: false,
            sortable: false,
            renderCell: (params) => (


                <ul className="h-40 overflow-y-auto *:text-xs">

                    {
                        params.value.map((spec) => (
                            <>
                                <li>
                                    {
                                        ` ${spec.specialization.name} - ₹${spec.price}`
                                    }
                                </li>

                            </>
                        ))
                    }
                </ul>
            )
        },
        { field: "experience", headerName: "Experience (yrs)", width: 140 },
        { field: "ratings", headerName: "Ratings", width: 120 },

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
        {
            field: 'id',
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <>
                    <Link to={`/doctor/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary.main" size="small">
                            Edit
                        </Button>
                    </Link>


                </>
            )
        }


    ];

    return (
        <Box sx={{ width: "100%", p: 3, backgroundColor: "white", boxShadow: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                        Doctors List
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign={'end'}>
                    <Link to={'/doctor/create'} className="px-4 py-2 bg-[var(--primary)] text-white rounded text-xs">Add New Doctor</Link>
                </Grid>
            </Grid>


            <div className="w-full">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4">
                        <label htmlFor=""></label>
                    </div>
                </div>
            </div>
            <DataGrid
                rows={doctors}
                columns={columns}
                pageSize={pageSize}
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
