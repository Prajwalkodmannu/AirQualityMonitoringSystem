import React, { useState, useEffect } from 'react';
import {
  FormControl, Stack, Button, Fab, Typography, TextField
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import { FetchAqiStatusReportDetails } from '../../services/LoginPageService';
import { DownloadReportAqiStatusCsv } from '../../services/DownloadCsvReportsService';

function AqiSitesReportForm(props) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [aqiStatusReportList, setAqiStatusReportList] = useState([]);
  const [unTaggedAqiStatusReportList, setUnTaggedAqiStatusReportList] = useState();

  useEffect(() => {
    FetchAqiStatusReportDetails({}, AqiStatusReportHandleSuccess, AqiStatusReportHandleException);
  }, [unTaggedAqiStatusReportList]);

  const AqiStatusReportHandleSuccess = (dataObject) => {
    console.log(dataObject)
    setAqiStatusReportList(dataObject.data);
    // console.log(dataObject);
    // setRowCountState(dataObject.data.totalRowCount)
    // setGridLoading(false);
    setGridLoading(false);
  };

  const AqiStatusReportHandleException = () => { };

  const columns = [
    {
      field: 'my_date',
      headerName: 'Date',
      width: 100,
      // renderCell: (params) => (
      //   <Typography>
      //     {
      //       dateFormat(params.value)
      //     }
      //   </Typography>
      // ),
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
      width: 100,
    },
    {
      field: 'maxAqi',
      headerName: 'AQI Status',
      width: 100,
    },

  ];
  // const dateFormat = (value) => {
  //   const dateTime = value.split(' ');
  //   const date = dateTime[0].split('-');
  //   const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
  //   return dateValue;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGridLoading(true);
    FetchAqiStatusReportDetails({
      location_id: props.location_id,
      branch_id: props.branch_id,
      facility_id: props.facility_id,
      building_id: props.building_id,
      floor_id: props.floor_id,
      lab_id: props.lab_id,
      fromDate,
      toDate
    }, AqiStatusReportHandleSuccess, AqiStatusReportHandleException);
  };

  const DownloadCsv = () => {
    DownloadReportAqiStatusCsv({
      location_id: props.location_id,
      branch_id: props.branch_id,
      facility_id: props.facility_id,
      building_id: props.building_id,
      floor_id: props.floor_id,
      lab_id: props.lab_id,
    }, DownloadAqiStatusReportHandleSuccess, DownloadAqiStatusReportHandleException);
  };
  const DownloadAqiStatusReportHandleSuccess = () => { };
  const DownloadAqiStatusReportHandleException = () => { };

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
              // DownloadCsv();
            }}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Download
          </Fab>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>

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
          <FormControl>
            <Button size="medium" variant="contained" autoFocus type="submit">
              Submit
            </Button>
          </FormControl>
          <FormControl>
            <Button size="medium" variant="contained" autoFocus>
              Cancel
            </Button>
          </FormControl>
        </Stack>
        <div style={{ height: 300, width: '100%', marginTop: 20 }}>
          <DataGrid
            rows={aqiStatusReportList}
            columns={columns}
            loading={isLoading}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </form>
  );
}

export default AqiSitesReportForm;
