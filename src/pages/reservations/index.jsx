import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchReservation } from './ReservationApi';
import { Link } from 'react-router-dom';
import { formatDate, formatToDDMMYY } from '../../utils';
import { Box, Chip } from '@mui/material';
import UserInfoBox from '../../Components/UserInfoBox';
import { BsFileExcel } from 'react-icons/bs';

const Reservations = () => {
    const [selectedIds, setSelectedIds] = React.useState([]);

    const handleSelectionChange = (selection) => {
        setSelectedIds(selection);

    };
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
            doctor: reservation.doctor,
            hospital: reservation.hospital?.name || 'N/A',
            user: reservation.user,
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
        {
            field: 'date', headerName: 'Date', width: 210, renderCell: (params) => (
                <>
                    <div className='text-xs'>

                        {
                            formatToDDMMYY(params.row.date)
                        }
                        {
                            params.row.slot
                        }
                    </div>
                </>
            )
        },

        { field: 'hospital', headerName: 'Hospital', width: 180 },
        {
            field: 'userName', headerName: 'User Name', width: 200, renderCell: (params) => (
                <>
                    <UserInfoBox user={params.row.user} />
                </>
            )
        },

        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'type', headerName: 'Type', width: 120 },
        { field: 'section', headerName: 'Section', width: 150 },
        { field: 'specialization', headerName: 'Specialization', width: 200 },
        { field: 'prescription', headerName: 'Prescription Uploaded', width: 180 },
        {
            field: 'createdAt', headerName: 'Created At', width: 180, renderCell: (params) => (
                <>
                    {
                        formatDate(params.row.createdAt).replace('T', ' ')
                    }
                </>
            )
        },
        {
            field: "Action",
            headerName: "Action",
            width: "200",
            renderCell: (params) => (
                <>
                    {
                        params.row.doctor ? (
                            <>
                                <Chip label="Doctor Accept" />
                            </>
                        ) : (
                            <>
                                <Link className='px-3 py-2 bg-[var(--primary)] text-white text-xs rounded' to={'/reservation/accept/' + params.row.id}>Accept</Link>


                            </>
                        )
                    }
                </>
            )
        }
    ];

    return (
        <section className=''>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12'>
                        <Box boxShadow={3} borderRadius={4} className="mb-7 p-4">
                            <div className="w-full">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-3">
                                        {
                                            selectedIds.length > 0 && (
                                                <>
                                                    <button className='rounded-full text-white tracking-widest uppercase px-5 text-xs py-2 bg-[var(--primary)]'>Ignore</button>

                                                </>
                                            )
                                        }

                                    </div>
                                    <div className="col-span-4">
                                        <div className="flex gap-1 *:rounded items-center *:text-xs *:px-2 *:py-1 ">


                                            <button  className='bg-gray-300 text-black'>All</button>
                                            <button className='bg-gray-300 text-black'>Past</button>
                                            <button  className='bg-gray-300 text-black'>Today</button>
                                            <button  className='bg-gray-300 text-black'>Upcoming</button>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <div className="text-end">
                                        <button  className='bg-gray-300 text-black'>
                                            <BsFileExcel/>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <Box boxShadow={3} borderRadius={4}>


                            <DataGrid
                                className='*:text-xs'
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
                                onRowSelectionModelChange={handleSelectionChange}
                                isRowSelectable={(params) => !params.row.doctor}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservations;
