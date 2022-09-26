import React, { useState, useEffect } from 'react';
import {
  FormControl, Button, Stack, Fab, Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { FetchApplicationVersionReportDetails } from '../../services/LoginPageService';

const columns = [
  {
    field: 'versionNumber',
    headerName: 'Version',
    width: 110,
  },
  {
    field: 'summary',
    headerName: 'Summary',
    width: 170,
  },
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
];

// Date
const convertDate = (value) => {
  let date = '';
  const dateTimeSplit = value && value.split(' ');
  if (dateTimeSplit) {
    const dateSplit = dateTimeSplit[0].split('-');
    date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
  }
  return date;
};

// Time
const convertTime = (value) => {
  let time = '';
  const dateTimeSplit = value && value.split(' ');
  if (dateTimeSplit) {
    time = dateTimeSplit[1];
  }
  return time;
};

function SoftwareVersion() {
  const [isLoading, setGridLoading] = useState(false);
  const [AppVersionReportList, setAppVersionReportList] = useState([]);
  const [unTaggedAppVersionReportReportList, setUnTaggedAppVersionReportReportList] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCountState, setRowCountState] = useState(0);

  useEffect(() => {
    FetchApplicationVersionReportDetails({ page, pageSize }, AppVersionReportHandleSuccess, AppVersionHandleException);
  }, [unTaggedAppVersionReportReportList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewData();
  };

  const fetchNewData = () => {
    setGridLoading(true);
    FetchApplicationVersionReportDetails({
      // fromDate, toDate,
      page, pageSize,
    }, AppVersionReportHandleSuccess, AppVersionHandleException);
  };

  const AppVersionReportHandleSuccess = (dataObject) => {
    setAppVersionReportList(dataObject.data);
    setRowCountState(dataObject.totalRowCount);
    setGridLoading(false);
  };

  const AppVersionHandleException = () => { };

  const handleCancel = () => {
    setAppVersionReportList([]);

    setGridLoading(false);
    setUnTaggedAppVersionReportReportList(!unTaggedAppVersionReportReportList);
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
    <form onSubmit={handleSubmit}>
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
        <Button
          variant="contained"
          onClick={() => {
            // SendEmail();
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
          <Button size="medium" variant="contained" autoFocus onClick={handleCancel}>
            Cancel
          </Button>
        </FormControl>
      </Stack>
      <div style={{ height: 300, width: '100%', marginTop: 25 }}>
        <DataGrid
          rows={AppVersionReportList}
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
  );
}

export default SoftwareVersion;
