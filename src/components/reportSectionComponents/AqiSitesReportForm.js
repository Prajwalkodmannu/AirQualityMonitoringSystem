import React, { useState, useEffect } from 'react';
import {
  FormControl, Stack, Button, Fab, Typography, TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import { FetchAqiStatusReportDetails } from '../../services/LoginPageService';
import { DownloadReportAqiCsv } from '../../services/DownloadCsvReportsService';


function AqiSitesReportForm(props) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [aqiStatusReportList, setAqiStatusReportList] = useState([]);
  const [unTaggedAqiStatusReportList, setUnTaggedAqiStatusReportList] = useState();

  useEffect(() => {
    // FetchAqiStatusReportDetails({}, AqiStatusReportHandleSuccess, AqiStatusReportHandleException);
    fetchNewData();
  }, [unTaggedAqiStatusReportList, page]);

  const AqiStatusReportHandleSuccess = (dataObject) => {
    setAqiStatusReportList(dataObject.data.data);
    setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const AqiStatusReportHandleException = () => { };

  const dateFormat = (value) => {
    const dateTime = value.split(' ');
    const date = dateTime[0].split('-');
    const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
    return dateValue;
  };

  const columns = [
    {
      field: 'date',
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
      headerName: 'Device Name',
      width: 120,
    },
    {
      field: 'AqiValue',
      headerName: 'AQI Status',
      width: 100,
    },

  ];

  const fetchNewData = () => {
    FetchAqiStatusReportDetails({
      page,
      pageSize,
      lab_id: props.lab_id,
      fromDate,
      toDate,
    }, AqiStatusReportHandleSuccess, AqiStatusReportHandleException);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGridLoading(true);
    fetchNewData();
  };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setGridLoading(false);
    setUnTaggedAqiStatusReportList(!unTaggedAqiStatusReportList);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };
  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const DownloadCsv = () => {
    // setReportControlType("download");
    DownloadReportAqiCsv({ labId: props.labId, fromDate, toDate }, csvReportHandleSuccess, csvReportHandleException);
  };

  const csvReportHandleSuccess = () => { };

  const csvReportHandleException = () => { };



  return (
    <form onSubmit={handleSubmit}>
      <div>
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
          <TextField
            sx={{ minWidth: 250 }}
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
        <div style={{ height: 310, width: '100%', marginTop: 20 }}>
          <DataGrid
            rows={aqiStatusReportList}
            rowCount={rowCountState}
            columns={columns}
            page={page}
            pagination
            loading={isLoading}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            // rowsPerPageOptions={[5, 10]}
            paginationMode="server"
          />
        </div>
      </div>
    </form>
  );
}

export default AqiSitesReportForm;
