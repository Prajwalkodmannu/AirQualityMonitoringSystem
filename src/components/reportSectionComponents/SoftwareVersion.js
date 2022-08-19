import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Date', width: 70 },
    { field: 'firstName', headerName: 'Time', width: 130 },
    { field: 'lastName', headerName: 'Software Version', width: 130 },
    {
        field: 'Summary',
        headerName: 'Summary',
        type: 'number',
        width: 90,
    },
];

const SoftwareVersion = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                // rows={ }
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    )
}

export default SoftwareVersion