import React, { useState, useEffect } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab, Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  DataGrid,
} from '@mui/x-data-grid';
import { FetchAlarmReportDetails } from '../../services/LoginPageService';
import { DownloadReportAlarmCsv } from '../../services/DownloadCsvReportsService';

function Alarm(props) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [alarmReportList, setAlarmReportList] = useState([]);
  const [unTaggedAlarmReportList, setUnTaggedAlarmReportList] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCountState, setRowCountState] = useState(0);
  const [reportControlType, setReportControlType] = useState();

  useEffect(() => {
    FetchAlarmReportDetails({}, AlarmReportHandleSuccess, AlarmReportHandleException);
  }, [unTaggedAlarmReportList]);

  const columns = [
    {
      field: 'a_date',
      headerName: 'Date',
      width: 130,
      renderCell: (params) => (
        <Typography>
          {
            dateFormat(params.value)
          }
        </Typography>
      ),
    },
    {
      field: 'a_time',
      headerName: 'Time',
      width: 130,
    },
    {
      field: 'deviceName',
      headerName: 'Devices',
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

  const dateFormat = (value) => {
    const date = value.split('-');
    const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
    return dateValue;
  };

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
  };

  const DownloadCsv = () => {
    // setReportControlType("download");
    DownloadReportAlarmCsv({ deviceId, fromDate, toDate }, csvReportHandleSuccess, csvReportHandleException);
  };

  const csvReportHandleSuccess = () => { };

  const csvReportHandleException = () => { };

  const fetchNewData = () => {
    setGridLoading(true);
    FetchAlarmReportDetails({
      page, pageSize, deviceId, fromDate, toDate,
    }, AlarmReportHandleSuccess, AlarmReportHandleException);
  };

  const AlarmReportHandleSuccess = (dataObject) => {
    setAlarmReportList(dataObject.data.data);
    setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const AlarmReportHandleException = () => { };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setDeviceId([]);
    setGridLoading(false);
    setUnTaggedAlarmReportList(!unTaggedAlarmReportList);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchNewData();
  };

  const SendEmail = () => {
    setReportControlType('email');
    DownloadReportAlarmCsv({
      reportControlType, deviceId, fromDate, toDate,
    }, csvReportHandleSuccess, csvReportHandleException);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

          <TextField
            sx={{ minWidth: 230 }}
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
          <TextField
            sx={{ minWidth: 230 }}
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
          <Box sx={{ minWidth: 230 }}>
            <FormControl fullWidth>
              <InputLabel>Devices</InputLabel>
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
  );
}

export default Alarm;
