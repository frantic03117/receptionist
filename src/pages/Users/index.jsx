import { Box } from '@mui/material'
import React from 'react'
import { fetchUsers } from './UserApi'; // Assuming this is your API call
import { DataGrid } from '@mui/x-data-grid';

const Users = () => {
    const [items, setItems] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const [total, setTotal] = React.useState(0);
    const [filters, setFilters] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
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
    const getItems = async () => {
        setLoading(true);
        const { data, total, currentPage } = await fetchUsers({ page, pageSize, filters });
        const formattedData = data.map((doctor) => ({
            id: doctor._id,
            ...doctor
        }));
        setItems(formattedData);
        setTotal(total);
        setPage(currentPage);
        setLoading(false);
    }

    React.useEffect(() => {
        getItems();
    }, [page, pageSize]);  // Ensure it refetches when page or pageSize changes

    const columns = [
        { field: "id", headerName: "Sr No", width: 80, filterable: false },
        { field: "name", headerName: "Name", width: 150 },
        // Add more columns as needed
    ];

    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12">
                        <Box className="p-5" boxShadow={3} borderRadius={2}>
                            <DataGrid
                                rows={items}
                                columns={columns}
                                pageSize={pageSize}
                                rowCount={total}
                                pagination
                                page={page}
                                loading={loading}
                                onPageChange={(newPage) => setPage(newPage)}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                paginationMode="server"  
                                onFilterModelChange={(model) => handleFilterChange(model)}
                                disableSelectionOnClick
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Users;
