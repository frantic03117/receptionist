import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchReservation } from './ReservationApi';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

const Reservations = () => {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const [total, setTotal] = React.useState(0);
    const [filters, setFilters] = React.useState([]);
    const handleFilterChange = (model) => {
        console.log("Filter Model:", model); // Debugging: Check what MUI sends
        if (!model.items || model.items.length === 0) {
            setFilters([]);
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
        setPage(0);
    };
    const getItems = async () => {
        setLoading(true);
        const { data, total, currentPage } = await fetchReservation({ page, pageSize, filters });
        const formattedData = data.map((reservation, index) => ({
            id: reservation._id,
            srNo: index + 1,
            date: reservation.date,
            slot: reservation.slot?.name,
            hospital: reservation.hospital || 'N/A',
            userName: reservation.user?.name,
            userEmail: reservation.user?.email,
            userPhone: reservation.user?.phone,
            status: reservation.status,
            type: reservation.type,
            section: reservation.selected_section,
            specialization: reservation.specialization?.name,
            prescription: reservation.prescription_uploaded,
            createdAt: reservation.created_at
        }));
        setItems(formattedData);
        setTotal(total);
        setPage(currentPage);
        setLoading(false);
    };

    React.useEffect(() => {
        getItems();
    }, [page, pageSize, filters]);

    const columns = [
        { field: 'srNo', headerName: 'Sr No', width: 80 },
        { field: 'date', headerName: 'Date', width: 150, renderCell : (params) => (
            <>
                {
                    formatDate(params.row.date).replace('T', ' ')
                }
            </>
        ) },
        { field: 'slot', headerName: 'Slot', width: 180 },
        { field: 'hospital', headerName: 'Hospital', width: 180 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'userEmail', headerName: 'User Email', width: 200 },
        { field: 'userPhone', headerName: 'User Phone', width: 150 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'type', headerName: 'Type', width: 120 },
        { field: 'section', headerName: 'Section', width: 150 },
        { field: 'specialization', headerName: 'Specialization', width: 200 },
        { field: 'prescription', headerName: 'Prescription Uploaded', width: 180 },
        { field: 'createdAt', headerName: 'Created At', width: 180, renderCell : (params) =>  (
            <>
                {
                    formatDate(params.row.createdAt).replace('T', ' ')
                }
            </>
        ) },
        {
            field: "Action",
            headerName: "Action",
            width: "200",
            renderCell: (params) => (
                <>
                    <Link className='px-3 py-2 bg-[var(--primary)] text-white text-xs rounded' to={'/reservation/accept/'+params.row.id}>Accept</Link>
                </>
            )
        }
    ];

    return (
        <section className='py-10'>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12'>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            pageSize={pageSize}
                            rowCount={total}
                            pagination
                            paginationMode='server'
                            onPageChange={(newPage) => setPage(newPage)}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            onFilterModelChange={(model) => handleFilterChange(model)}
                            loading={loading}
                            autoHeight
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservations;
