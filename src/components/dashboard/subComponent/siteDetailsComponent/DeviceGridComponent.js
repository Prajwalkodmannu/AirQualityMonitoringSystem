import React, { useEffect, useState } from 'react';
import {
  Breadcrumbs, Typography, Grid,
} from '@mui/material';
import { DeviceFetchService, HooterRelayService } from '../../../../services/LoginPageService';
import DeviceWidget from '../deviceCard/DeviceWidget';
import NotificationWidget from '../deviceCard/NotificationWidget';
import ApplicationStore from '../../../../utils/localStorageUtil';
import NotificationBar from '../../../notification/ServiceNotificationBar';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */

function DeviceGridComponent({
  setImg, locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
  setDeviceCoordsList, setIsDashBoard, setIsGeoMap, siteImages,
}) {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceTotal, setDeviceTotal] = useState('0');
  const [deviceAlert, setAlertTotal] = useState('0');
  const [disconnectedDevices, setDisconnectedDevices] = useState('0');
  const [labHooterStatus, setLabHooterStatus] = useState('0');
  const [expanded, setExpanded] = useState(false);
  const { intervalDetails } = ApplicationStore().getStorage('userDetails');
  const { deviceIdList } = ApplicationStore().getStorage('alertDetails');
  const intervalSec = intervalDetails.deviceLogInterval * 1000;
  const [pollingStatus, setPollingStatus] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    console.log(deviceIdList);
    intervalCallFunction();
    const devicePolling = setInterval(() => {
      intervalCallFunction();
    }, intervalSec);
    return () => {
      clearInterval(devicePolling);
    };
  }, [locationDetails]);

  const intervalCallFunction = () => {
    DeviceFetchService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
      facility_id: locationDetails.facility_id,
      building_id: locationDetails.building_id,
      floor_id: locationDetails.floor_id,
      lab_id: locationDetails.lab_id,
    }, handleSuccess, handleException);
  };

  const handleSuccess = (dataObject) => {
    // setPollingStatus(true);
    setDeviceList(dataObject.data);
    const deviceCoordinationsList = dataObject.data.map((data) => {
      const coordination = data.floorCords;
      const arrayList = coordination?.split(',');
      return arrayList && { top: arrayList[0], left: arrayList[1] };
    });
    const filteredArray = deviceCoordinationsList.filter((x) => x != null);
    setDeviceCoordsList(filteredArray || []);
    setDeviceTotal(dataObject.totalData);
    setAlertTotal(dataObject.alertCount);
    setDisconnectedDevices(dataObject.disconnectedDevices);
    setLabHooterStatus(dataObject.labHooterStatus);
  };

  const handleException = () => { };

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState(() => {
      let newValue = value;
      if (locationDetails.facility_id) {
        newValue = 2;
      } else if (locationDetails.branch_id) {
        newValue = 1;
      }
      return newValue;
    });
  };

  const handleHooter = () =>{
    HooterRelayService({lab_id: locationDetails.lab_id}, handleHooterSuccess, handleHooterException);
  }
  
  const handleHooterSuccess = (dataObject) =>{
    console.log(dataObject.message);
    setLabHooterStatus('0');
    setNotification({
      status: true,
      type: 'success',
      message: 'Disabled Successfully...!',
    });
  }

  const handleHooterException = () =>{
    setNotification({
      status: false,
      type: 'error',
      message: 'Unable to disable the hooter...!',
    });
  }

  const handleAlert = () =>{
    console.log(locationDetails.lab_id); 
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <div style={{
      height: '98%', width: '100%', marginTop: 10, marginLeft: 10, paddingLeft: 5, paddingTop: 5,
    }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setLocationlabel(0);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setLocationlabel(1);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setLocationlabel(2);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.branchLabel}
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setProgressState(3);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.facilityLabel}
        </h3>
        <h3
          onClick={() => {
            setIsGeoMap(false);
            setDeviceCoordsList([]);
            setImg(siteImages.buildingImage);
            setProgressState(4);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.buildingLabel}
        </h3>
        <h3
          onClick={() => {
            setImg(siteImages.floorImage);
            setDeviceCoordsList([]);
            setIsGeoMap(false);
            setProgressState(5);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.floorLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.lablabel}
        </Typography>
      </Breadcrumbs>
      <div className="widgets" style={{ height: 'auto', backgroundColor: '#fafafa', padding: 10 }}>
        <NotificationWidget type="hooterStatus" figure={labHooterStatus} handleClick={handleHooter}/>
        <NotificationWidget type="disconnectedDevice" figure={disconnectedDevices}/>
        <NotificationWidget type="devices" figure={deviceTotal} />
        <NotificationWidget type="alerts" figure={deviceAlert} handleClick={handleAlert}/>
        <NotificationWidget type="time" />
      </div>
      <div
        className=""
        style={{
          marginTop: 5,
          maxHeight: '60vh',
          overflow: 'auto',
        }}
      >
        <Grid container sx={{ width: '100%' }}>

          {deviceList.map((data, index) => {
            return (
              <Grid
                item
                sm={6}
                xs={6}
                md={4}
                lg={3}
                xl={3}
                /* eslint-disable-next-line */
                key={index}
                sx={{ padding: 1 }}
              >
                <DeviceWidget
                  type="aqmi"
                  data={data}
                  deviceIdList={deviceIdList}
                  setLocationDetails={setLocationDetails}
                  setIsDashBoard={setIsDashBoard}
                  setBreadCrumbLabels={setBreadCrumbLabels}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}

export default DeviceGridComponent;
