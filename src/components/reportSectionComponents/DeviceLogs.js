import React, { useState, useEffect } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab, Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { FetchSensorLogReportDetails } from '../../services/LoginPageService';
import { DownloadReportSensorLogCsv } from '../../services/DownloadCsvReportsService';

function DeviceLogs(props) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [sensorLogReportList, setSensorLogReportList] = useState([]);
  const [unTaggedSensorLogReportList, setUnTaggedSensorLogReportList] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCountState, setRowCountState] = useState(0);

  useEffect(() => {
    fetchNewData();
  }, [unTaggedSensorLogReportList, page]);

  const columns = [
    {
      field: 'created_at',
      headerName: 'Date',
      width: 170,
      renderCell: (params) => (
        <Typography>
          {
            dateFormat(params.value)
          }
        </Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'User',
      width: 170,
    },
    {
      field: 'deviceName',
      headerName: 'Device',
      width: 170,
    },
    {
      field: 'sensorTag',
      headerName: 'Sensor',
      width: 70,
    },
    {
      field: 'criticalMinValue',
      headerName: 'Critical Min Value',
      width: 170,
    },
    {
      field: 'criticalMaxValue',
      headerName: 'Critical Max Value',
      width: 170,
    },
    {
      field: 'warningMinValue',
      headerName: 'Warning Min Value',
      width: 170,
    },
    {
      field: 'warningMaxValue',
      headerName: 'Warning Max Value',
      width: 170,
    },
    {
      field: 'outofrangeMinValue',
      headerName: 'Out Of Range Min Value',
      width: 170,
    },
    {
      field: 'outofrangeMaxValue',
      headerName: 'Out Of Range Max Value',
      width: 170,
    },
  ];

  const dateFormat = (value) => {
    const dateTime = value.split(' ');
    const date = dateTime[0].split('-');
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
  };

  const DownloadCsv = () => {
    DownloadReportSensorLogCsv({ deviceId, fromDate, toDate }, csvReportHandleSuccess, csvReportHandleException);
  };

  const csvReportHandleSuccess = () => { };

  const csvReportHandleException = () => { };

  const fetchNewData = () => {
    setGridLoading(true);
    FetchSensorLogReportDetails({
      page, pageSize, deviceId, fromDate, toDate,
    }, SensorLogReportHandleSuccess, SensorLogHandleException);
  };

  const SensorLogReportHandleSuccess = (dataObject) => {
    setSensorLogReportList(dataObject.data);
    setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const SensorLogHandleException = () => { };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setDeviceId([]);
    setGridLoading(false);
    setUnTaggedSensorLogReportList(!unTaggedSensorLogReportList);
  };
  const onPageChange = (newPage) => {
    setPage(newPage);
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
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
          <TextField
            sx={{ minWidth: 250 }}
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
        <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
          <DataGrid
            rows={sensorLogReportList}
            rowCount={rowCountState}
            loading={isLoading}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            columns={columns}
          />
        </Box>
      </form>
    </div>
  );
}

export default DeviceLogs;
