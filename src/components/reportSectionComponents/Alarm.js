import React, { useState, useEffect } from 'react'
import { FetchAlarmReportDetails } from '../../services/LoginPageService';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {
    DataGrid
} from '@mui/x-data-grid';
import { DownloadReportAlarmCsv } from '../../services/DownloadCSVAlarmReport';



const Alarm = (props) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [isLoading, setGridLoading] = useState(false);
    const [alarmReportList, setAlarmReportList] = useState([]);
    const [unTaggedAlarmReportList, setUnTaggedAlarmReportList] = useState();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCountState, setRowCountState] = useState(0);


    useEffect(() => {
        FetchAlarmReportDetails({}, AlarmReportHandleSuccess, AlarmReportHandleException);
    }, [unTaggedAlarmReportList]);

    const columns = [
        {
            field: 'a_date',
            headerName: 'Date',
            width: 130,
        },
        {
            field: 'a_time',
            headerName: 'Time',
            width: 130,
        },
        {
            field: 'deviceName',
            headerName: 'AQMI/O ID',
            width: 130,
        },
        {
            field: 'labDepName',
            headerName: 'Zone',
            width: 130,
        },
        {
            field: 'sensorTag',
            headerName: 'Sensor',
            width: 130,
        },
        {
            field: 'alertType',
            headerName: 'Alarm Type',
            width: 130,
        },
        {
            field: 'Reason',
            headerName: 'Reason',
            width: 130,
        },
    ];

    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNewData();
    };

    const onPageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        fetchNewData();
    }

    const DownloadCsv = () => {
        DownloadReportAlarmCsv({ deviceId, fromDate, toDate }, csvReportHandleSuccess, csvReportHandleException)
    };


    const csvReportHandleSuccess = (dataObject) => {
        // console.log(dataObject.data);
    };

    const csvReportHandleException = (dataObject) => {
        // console.log(dataObject.message);
    };

    const fetchNewData = () => {
        setGridLoading(true);
        FetchAlarmReportDetails({ page, pageSize, deviceId, fromDate, toDate }, AlarmReportHandleSuccess, AlarmReportHandleException);
    }

    const AlarmReportHandleSuccess = (dataObject) => {
        setAlarmReportList(dataObject.data.data);
        setRowCountState(dataObject.data.totalRowCount)
        setGridLoading(false);
    }

    const AlarmReportHandleException = () => { }

    const handleCancel = () => {
        setFromDate('');
        setToDate('');
        setDeviceId([]);
        setGridLoading(false);
        setUnTaggedAlarmReportList(!unTaggedAlarmReportList);
    }

    const onPageChange = (newPage) => {
        setPage(newPage)
        fetchNewData();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center" >
                    <Fab variant="extended" size="medium" color="primary" aria-label="add"
                        onClick={() => {
                            DownloadCsv();
                        }}
                    >
                        <DownloadIcon sx={{ mr: 1 }} />
                        Download
                    </Fab>
                    <TextField sx={{ minWidth: 250 }}
                        label="From Date"
                        type="date"
                        value={fromDate}
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFromDate(e.target.value);
                        }}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => {

                                setFromDate(newValue);
                            }}
                        />
                    </LocalizationProvider> */}
                    <TextField sx={{ minWidth: 250 }}
                        label="to date"
                        type="date"
                        value={toDate}
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setToDate(e.target.value);
                        }}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                        />
                    </LocalizationProvider> */}
                    <Box sx={{ minWidth: 250 }}>
                        <FormControl fullWidth>
                            <InputLabel >AQMI/AQMO</InputLabel>
                            <Select
                                value={deviceId}
                                label="Age"
                                onChange={(e) => {
                                    HandleDeviceChange(e.target.value)
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
                        <Button size="medium" variant="contained" autoFocus onClick={handleCancel}>
                            Cancel
                        </Button>
                    </FormControl>
                </Stack>
                <div style={{ height: 400, width: '100%', marginTop: 12 }}>
                    <DataGrid
                        rows={alarmReportList}
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
        </div>
    )
}

export default Alarm