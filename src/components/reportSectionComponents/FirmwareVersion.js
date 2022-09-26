import React, { useState, useEffect } from 'react'
import { FormControl, Select, Button, Stack, InputLabel, MenuItem, Box, Fab, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import { FetchFirmwareVersionReportDetails } from '../../services/LoginPageService';


// Date
const convertDate = (value) => {
    var date = '';
    var dateTimeSplit = value && value.split(" ");
    if (dateTimeSplit) {
        var dateSplit = dateTimeSplit[0].split("-");
        date = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
    }
    return date;
}

// Time
const convertTime = (value) => {
    var time = '';
    var dateTimeSplit = value && value.split(" ");
    if (dateTimeSplit) {
        time = dateTimeSplit[1];
    }
    return time;
}


const columns = [
    {
        field: 'created_at',
        headerName: 'Date',
        renderCell: (params) => (
            <Typography>
                {
                    convertDate(params.value)
                }
            </Typography>
        ),
    },
    {
        field: 'updated_at',
        headerName: 'Time',
        renderCell: (params) => (
            <Typography>
                {
                    convertTime(params.value)
                }
            </Typography>
        ),
    },
    { field: 'deviceName', headerName: 'Device Name', width: 130 },
    { field: 'firmwareVersion', headerName: 'FirmwareVersion', width: 130 },
    // { field: 'HardwareVersion', headerName: 'HardwareVersion', width: 130 },

];

// const dateFormat = (value) => {
//     const dateTime = value.split(' ');
//     const date = dateTime[0].split('-');
//     const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
//     return dateValue;
// };



const FirmwareVersion = (props) => {
    const [deviceId, setDeviceId] = useState('');
    const [isLoading, setGridLoading] = useState(false);
    const [firmwareVersionReportList, setFirmwareVersionReportList] = useState([]);
    const [unTaggedFirmwareVersionReportReportList, setUnTaggedFirmwareVersionReportReportList] = useState();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCountState, setRowCountState] = useState(0);

    useEffect(() => {
        FetchFirmwareVersionReportDetails({ deviceId }, FirmwareVersionReportHandleSuccess, FirmwareVersionHandleException);
    }, [unTaggedFirmwareVersionReportReportList]);


    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNewData();
    }

    const fetchNewData = () => {
        setGridLoading(true);
        setDeviceId(deviceId);
        FetchFirmwareVersionReportDetails({
            page, pageSize, deviceId,
        }, FirmwareVersionReportHandleSuccess, FirmwareVersionHandleException);
    };

    const FirmwareVersionReportHandleSuccess = (dataObject) => {
        console.log(dataObject.data);
        setFirmwareVersionReportList(dataObject.data.data);
        setRowCountState(dataObject.totalRowCount);
        setGridLoading(false);
    };

    const FirmwareVersionHandleException = (dataObject) => { };

    const handleCancel = () => {
        setDeviceId([]);
        setGridLoading(false);
        setUnTaggedFirmwareVersionReportReportList(!unTaggedFirmwareVersionReportReportList);
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
                <Box sx={{ minWidth: 230 }}>
                    <FormControl fullWidth>
                        <InputLabel>Device</InputLabel>
                        <Select
                            value={deviceId}
                            label="Age"
                            onChange={(e) => {
                                HandleDeviceChange(e.target.value);
                            }}
                        >
                            {props.deviceList.map((data) => (
                                <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
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
                    rows={firmwareVersionReportList}
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

export default FirmwareVersion