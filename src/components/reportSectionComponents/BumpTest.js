import React, { useState, useEffect } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab, Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import {
  DataGrid,
} from '@mui/x-data-grid';
import { FetchBumpTestReportDetails } from '../../services/LoginPageService';
import { DownloadReportBumpTestCsv } from '../../services/DownloadCsvReportsService';

function BumpTest(props) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [device_id, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [bumpTestReportList, setBumpTestReportList] = useState([]);
  const [unTaggedBumpTestReportList, setUnTaggedBumpTestReportList] = useState();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCountState, setRowCountState] = useState(0);

  useEffect(() => {
    FetchBumpTestReportDetails({}, BumpTestReportHandleSuccess, BumpTestReportHandleException);
  }, [unTaggedBumpTestReportList]);

  const columns = [
    {
      field: 'created_at',
      headerName: 'Date',
      width: 100,
      renderCell: (params) => (
        <Typography>
          {
            dateFormat(params.value)
          }
        </Typography>
      ),
    },
    {
      field: 'stateName',
      headerName: 'Site',
      width: 100,
    },
    {
      field: 'branchName',
      headerName: 'Branch',
      width: 100,
    },
    {
      field: 'facilityName',
      headerName: 'Facilities',
      width: 100,
    },
    {
      field: 'buildingName',
      headerName: 'Building',
      width: 100,
    },
    {
      field: 'floorName',
      headerName: 'Floor',
      width: 100,
    },
    {
      field: 'labDepName',
      headerName: 'Zone',
      width: 100,
    },
    {
      field: 'deviceName',
      headerName: 'AQMI/O ID',
      width: 100,
    },
    {
      field: 'sensorTagName',
      headerName: 'Sensor',
      width: 100,
    },
    {
      field: 'result',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'lastDueDate',
      headerName: 'Due Date',
      width: 100,
    },
  ];
  const dateFormat = (value) => {
    const dateTime = value.split(' ');
    const date = dateTime[0].split('-');
    const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
    return dateValue;
  };

  const HandleDeviceChange = (device_id) => {
    setDeviceId(device_id);
  };

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    FetchNewData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    FetchNewData();
  };

  const FetchNewData = () => {
    setGridLoading(true);
    FetchBumpTestReportDetails({
      page, pageSize, device_id, fromDate, toDate,
    }, BumpTestReportHandleSuccess, BumpTestReportHandleException);
  };

  const BumpTestReportHandleSuccess = (dataObject) => {
    setBumpTestReportList(dataObject.data.data);
    setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const BumpTestReportHandleException = () => { };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setDeviceId([]);
    setGridLoading(false);
    setUnTaggedBumpTestReportList(!unTaggedBumpTestReportList);
  };

  const OnPageChange = (newPage) => {
    setPage(newPage);
    FetchNewData();
  };

  const DownloadCsv = () => {
    DownloadReportBumpTestCsv({ device_id, fromDate, toDate }, csvReportHandleSuccess, csvReportHandleException);
  };

  const csvReportHandleSuccess = () => { };

  const csvReportHandleException = () => { };

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
            sx={{ minWidth: 230 }}
            label="From Date"
            type="date"
            variant="outlined"
            value={fromDate}
            required
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
          <Box sx={{ minWidth: 230 }}>
            <FormControl fullWidth>
              <InputLabel>Device</InputLabel>
              <Select
                value={device_id}
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
        <div style={{ height: 350, width: '100%', marginTop: 25 }}>
          <DataGrid
            rows={bumpTestReportList}
            rowCount={rowCountState}
            loading={isLoading}
            rowsPerPageOptions={[1, 10, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={OnPageChange}
            onPageSizeChange={onPageSizeChange}
            columns={columns}
            // initialState={initialState}
          />
        </div>
      </form>
    </div>
  );
}

export default BumpTest;
