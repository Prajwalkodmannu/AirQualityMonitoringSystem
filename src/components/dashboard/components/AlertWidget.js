import { Delete } from '@mui/icons-material';
import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useUserAccess } from '../../../context/UserAccessProvider';
import { SensorIdAlertUpdate } from '../../../services/LoginPageService';

/* eslint-disable no-unused-vars */
function AlertWidget({
  dataList, setRefreshData, maxHeight, setAlertList, setNotification,
}) {
  const [clearAlert, setClearAlert] = useState(false);
  const [clearAlertReason, setAlertReason] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const moduleAccess = useUserAccess()('dashboard');
  const convertDateTime = (value) => {
    const dateSplit = value.split('-');
    const date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    return date;
  };

  const columns = [
    {
      field: 'a_date',
      headerName: 'Date',
      width: 100,
      renderCell: (params) => (
        <Typography>
          {
            convertDateTime(params.value)
          }
        </Typography>
      ),
    },
    {
      field: 'a_time',
      headerName: 'Time',
      width: 100,
    },
    {
      field: 'sensorTag',
      headerName: 'Sensor Tag',
      width: 100,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 100,
    },
    {
      field: 'msg',
      headerName: 'Message',
      width: 300,
    },
    {
      field: 'statusMessage',
      headerName: 'statusMessage',
      width: 100,
    },
    {
      field: 'alarmType',
      headerName: 'Alarm',
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => [
        <ClearAlert selectedRow={params.row} />,
      ],
    },
  ];

  function ClearAlert({ selectedRow }) {
    return (
      selectedRow.alarmType === 'Latch'
        ? (
          <Button
            variant="contained"
            color="success"
            startIcon={<Delete />}
            onClick={(e) => {
              setSensorId(selectedRow.id);
              setClearAlert(true);
            }}
          >
            Clear
          </Button>
        )
        : ''
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    SensorIdAlertUpdate({
      sensor_id: sensorId, clearAlertReason,
    }, handleSuccess, handleException);

    setClearAlert(false);
    setAlertReason('');
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setAlertList((oldValue) => oldValue.filter((data) => {
      return data.id !== sensorId;
    }));
    setRefreshData((oldvalue) => !oldvalue);
  };

  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };

  return (
    <div style={{ height: '47vh', width: '100%' }}>
      <Typography
        underline="hover"
        color="inherit"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#403f3e'
        }}
      >
        Alerts
      </Typography>
      <DataGrid
        rows={dataList || []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ 
          maxHeight: maxHeight || '40vh' 
        }}
        columnVisibilityModel={{
          actions : moduleAccess.delete
        }}
      />
      <Dialog
        sx={{ '& .MuiDialog-paper': { minWidth: '40%' } }}
        maxWidth="sm"
        open={clearAlert}
      >
        <DialogTitle>
          Clear alert with reason
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px " style={{ textAlign: '-webkit-center' }}>
              <TextField
                id="outlined-name"
                label="Reason"
                value={clearAlertReason}
                fullWidth
                required
                multiline
                rows={5}
                onChange={(e) => {
                  setAlertReason(e.target.value);
                }}
              />
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
                style={{ marginTop: '30px' }}
              >
                <Button
                  type="submit"
                >
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    setClearAlert(false);
                    setAlertReason('');
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AlertWidget;
