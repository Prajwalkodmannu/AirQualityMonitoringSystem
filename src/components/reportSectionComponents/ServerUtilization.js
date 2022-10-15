import React, { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { FetchServerUsageReportDetails } from '../../services/LoginPageService';

const columns = [

    {
        field: 'avg_cpu_load',
        headerName: 'AVG RAM %',
        width: 300
    },
    {
        field: 'perc_server_load',
        headerName: 'AVG CPU %',
        width: 300
    },
    {
        field: 'perc_memory_usage',
        headerName: 'Disk Utilization',
        type: 'number',
        width: 300,
    },
];



const ServerUtilization = () => {
    const [deviceId, setDeviceId] = useState('');
    const [isLoading, setGridLoading] = useState(false);
    const [serverUsageReportList, setServerUsageReportList] = useState([]);
    const [unTaggedServerUsageReportList, setUnTaggedServerUsageReportList] = useState();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCountState, setRowCountState] = useState(0);

    useEffect(() => {
        FetchServerUsageReportDetails({ deviceId }, ServerUsageReportHandleSuccess, ServerUsageReportHandleException);
    }, [unTaggedServerUsageReportList]);




    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNewData();
    }

    const fetchNewData = () => {
        setGridLoading(true);
        setDeviceId(deviceId);
        FetchServerUsageReportDetails({
            page, pageSize
        }, ServerUsageReportHandleSuccess, ServerUsageReportHandleException);
    };

    const ServerUsageReportHandleSuccess = (dataObject) => {
        console.log(dataObject.data);
        setServerUsageReportList(dataObject.data);
        setRowCountState(dataObject.totalRowCount);
        setGridLoading(false);
    };

    const ServerUsageReportHandleException = (dataObject) => { };

    const handleCancel = () => {
        setDeviceId([]);
        setGridLoading(false);
        setUnTaggedServerUsageReportList(!unTaggedServerUsageReportReportList);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);
        fetchNewData();
    };

    const onPageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        fetchNewData();
    };












    return (
        <>  <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center">
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                        DownloadCsv();
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                </Fab>
                <Button
                    variant="contained"
                    onClick={() => {
                        SendEmail();
                    }}
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus type="submit">
                        Submit
                    </Button>
                </FormControl>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus onClick={handleCancel} >
                        Cancel
                    </Button>
                </FormControl>
            </Stack>
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={serverUsageReportList}
                    rowCount={rowCountState}
                    loading={isLoading}
                    rowsPerPageOptions={[5, 10, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    columns={columns}
                />
            </div>
        </form>
        </>
    )
}

export default ServerUtilization