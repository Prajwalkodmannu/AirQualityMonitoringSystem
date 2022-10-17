import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmailConfigToolBar from '../components/emailTemplateConfig/EmailConfigToolBar';
import NotificationBar from '../components/notification/ServiceNotificationBar';
import { EmailTemplateFetchService, EmailTemplateUpdateService } from '../services/LoginPageService';

const EmailConfig = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [isEdit, setisEdit] = useState(true);

  const [id, setId] = useState('');
  const [calibrartionSubject, setCalibrartionSubject] = useState('');
  const [calibrartionBody, setCalibrartionBody] = useState('');
  const [bumpTestSubject, setBumpTestSubject] = useState('');
  const [bumpTestBody, setBumpTestBody] = useState('');
  const [stelSubject, setStelSubject] = useState('');
  const [stelBody, setStelBody] = useState('');
  const [twaSubject, setTwaSubject] = useState('');
  const [twaBody, setTwaBody] = useState('');
  const [warningSubject, setWarningSubject] = useState('');
  const [warningBody, setWarningBody] = useState('');
  const [criticalSubject, setCriticalSubject] = useState('');
  const [criticalBody, setCriticalBody] = useState('');
  const [outOfRangeSubject, setOutOfRangeSubject] = useState('');
  const [outOfRangeBody, setOutOfRangeBody] = useState('');
  const [periodicitySubject, setPeriodicitySubject] = useState('');
  const [periodicityBody, setPeriodicityBody] = useState('');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  
  useEffect(()=>{
    EmailTemplateFetchService(handleFetchSuccess, handleFetchException);
  }, [refreshData]);
  
  const handleFetchSuccess = (dataObject) =>{
    console.log(dataObject);
    setId(dataObject.data[0]?.id || '');
    setCalibrartionSubject(dataObject.data[0]?.calibrartionSubject || '');
    setCalibrartionBody(dataObject.data[0]?.calibrartionBody || '');
    setBumpTestSubject(dataObject.data[0]?.bumpTestSubject || '');
    setBumpTestBody(dataObject.data[0]?.bumpTestBody || '');
    setStelSubject(dataObject.data[0]?.stelSubject || '');
    setStelBody(dataObject.data[0]?.stelBody || '');
    setTwaSubject(dataObject.data[0]?.twaSubject || '');
    setTwaBody(dataObject.data[0]?.twaBody || '');
    setWarningSubject(dataObject.data[0]?.warningSubject || '');
    setWarningBody(dataObject.data[0]?.warningBody || '');
    setCriticalSubject(dataObject.data[0]?.criticalSubject || '');
    setCriticalBody(dataObject.data[0]?.criticalBody || '');
    setOutOfRangeSubject(dataObject.data[0]?.outOfRangeSubject || '');
    setOutOfRangeBody(dataObject.data[0]?.outOfRangeBody || '');
    setPeriodicitySubject(dataObject.data[0]?.periodicitySubject || '');
    setPeriodicityBody(dataObject.data[0]?.periodicityBody || '');
  }

  const handleFetchException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };
  const onSubmit = (e) =>{
    e.preventDefault();
    EmailTemplateUpdateService({
      id,
      calibrartionSubject,
      calibrartionBody,
      bumpTestSubject,
      bumpTestBody,
      stelSubject,
      stelBody,
      twaSubject,
      twaBody,
      warningSubject,
      warningBody,
      criticalSubject,
      criticalBody,
      outOfRangeSubject,
      outOfRangeBody,
      periodicitySubject,
      periodicityBody
    }, handleUpdateSuccess, handleUpdateException);
  }

  const handleUpdateSuccess = (dataObject) => {
    setisEdit(true);
    setRefreshData(oldValue=>!oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
  };

  const handleUpdateException = (errorObject, errorMessage) => {
    setisEdit(true);
    setRefreshData(oldValue=>!oldValue);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const onCancel = () =>{
    setisEdit(true);
    setRefreshData(oldValue=>!oldValue);
  }
  return (
    <Grid container>
      <EmailConfigToolBar isEdit={isEdit} setisEdit={setisEdit}/>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid container spacing={1} style={{
            padding:'2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Calibration :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Calibration Subject"
                type="text"
                disabled={isEdit}
                value={calibrartionSubject}
                variant="outlined"
                onChange={(e) => { setCalibrartionSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Calibration Body"
                type="text"
                disabled={isEdit}
                value={calibrartionBody}
                variant="outlined"
                onChange={(e) => { setCalibrartionBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Bump Test :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Bump Test Subject"
                type="text"
                disabled={isEdit}
                value={bumpTestSubject}
                variant="outlined"
                onChange={(e) => { setBumpTestSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Bump Test Body"
                type="text"
                disabled={isEdit}
                value={bumpTestBody}
                variant="outlined"
                onChange={(e) => { setBumpTestBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              STEL :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="STEL Subject"
                type="text"
                disabled={isEdit}
                value={stelSubject}
                variant="outlined"
                onChange={(e) => { setStelSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="STEL Body"
                type="text"
                disabled={isEdit}
                value={stelBody}
                variant="outlined"
                onChange={(e) => { setStelBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              TWA :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="TWA Subject"
                type="text"
                disabled={isEdit}
                value={twaSubject}
                variant="outlined"
                onChange={(e) => { setTwaSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="TWA Body"
                type="text"
                disabled={isEdit}
                value={twaBody}
                variant="outlined"
                onChange={(e) => { setTwaBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Warning :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Warning Subject"
                type="text"
                disabled={isEdit}
                value={warningSubject}
                variant="outlined"
                onChange={(e) => { warningSubject, setWarningSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Warning Body"
                type="text"
                disabled={isEdit}
                value={warningBody}
                variant="outlined"
                onChange={(e) => { setWarningBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Critical :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Critical Subject"
                type="text"
                disabled={isEdit}
                value={criticalSubject}
                variant="outlined"
                onChange={(e) => { setCriticalSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Critical Body"
                type="text"
                disabled={isEdit}
                value={criticalBody}
                variant="outlined"
                onChange={(e) => { setCriticalBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Out of Range:
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Out of Range Subject"
                type="text"
                disabled={isEdit}
                value={outOfRangeSubject}
                variant="outlined"
                onChange={(e) => { setOutOfRangeSubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Out of Range Body"
                type="text"
                disabled={isEdit}
                value={outOfRangeBody}
                variant="outlined"
                onChange={(e) => { setOutOfRangeBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{
            padding:'2px',
            marginTop: '2px'
          }}>
            <Grid 
              item
              xs={12} 
              sm={2} 
              md={2} 
              lg={2} 
              xl={2}
              style={{
                alignSelf: 'center'
              }}
            >
              Periodicity :
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Periodicity Subject"
                type="text"
                disabled={isEdit}
                value={periodicitySubject}
                variant="outlined"
                onChange={(e) => { setPeriodicitySubject(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sm={5} 
              md={5} 
              lg={5} 
              xl={5}
            >
              <TextField
                fullWidth
                // sx={{ mb: 1 }}
                label="Periodicity Body"
                type="text"
                disabled={isEdit}
                value={periodicityBody}
                variant="outlined"
                onChange={(e) => { setPeriodicityBody(e.target.value); }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{
          display: 'block',
            // float: 'right'
          }}>
          <Grid item style={{
            float: 'right'
          }}>
            <Button
              type="submit"
              disabled={isEdit}
            >
              Update
            </Button>
            <Button
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Grid>
  )
}

export default EmailConfig