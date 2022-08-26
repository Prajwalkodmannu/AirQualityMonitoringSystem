import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Widget from '../../../widget/Widget';
import LayoutMachine from '../landingPageComponents/LayoutMachine';
import SensorGraphComponent from '../landingPageComponents/SensorGraphComponent';
import { DashboardSensorListDetails } from '../../../../services/LoginPageService';
import AlertModalComponent from '../landingPageComponents/AlertModalComponent';
import ApplicationStore from '../../../../utils/localStorageUtil';

function LandingPageComponent({ locationDetails, setIsDashBoard }) {
  const [deviceId, setDeviceId] = useState({
    device_id: locationDetails.device_id
  });
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [sensorTagId, setSensorTagId] = useState('');
  const [sensorTag, setSensorTag] = useState('');
  const [segretionInterval, setSegretionInterval] = useState('1');
  const [rangeInterval, setRangeInterval] = useState('500*60');
  const [totalSensors, setTotalSensors] = useState(0);
  const [totalAlerts, setTotalALerts] = useState(0);
  const { intervalDetails } = ApplicationStore().getStorage('userDetails');
  const { sensorIdList } = ApplicationStore().getStorage('alertDetails');
  const intervalSec = intervalDetails.sensorLogInterval * 1000;

  /* eslint-disable-next-line */
  useEffect(() => {
    intervalCallFunction();
    /* eslint-disable-next-line */
    if (open === true) { } else {
      const devicePolling = setInterval(() => {
        intervalCallFunction();
      }, intervalSec);
      return () => {
        clearInterval(devicePolling);
      };
    }
  }, [locationDetails, open]);

  const intervalCallFunction = () => {
    DashboardSensorListDetails({ device_id: locationDetails.device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  };
  const fetchSenosorListSuccess = (dataObject) => {
    setTotalSensors(dataObject.sensorCount || '');
    setTotalALerts(dataObject.alertCount || '');
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbus.data || []);
  };

  const fetchSenosorListException = () => {
  };

  return (
    <div style={{ textAlignLast: 'left' }}>
      <Button
        variant="outlined"
        style={{ marginLeft: '10px', marginTop: '5px' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          setIsDashBoard(2);
        }}
      >
        Back to Data Logger
      </Button>
      <div className="widgets" style={{ height: 'auto', backgroundColor: '#fafafa', padding: 10 }}>

        <Widget type="devices" totalSensors={totalSensors} />
        <Widget type="alerts" setAlertOpen={setAlertOpen} totalAlerts={totalAlerts} />
        <Widget type="time" />
      </div>
      <LayoutMachine
        setOpen={setOpen}
        analogSensorList={analogSensorList}
        digitalSensorList={digitalSensorList}
        modbusSensorList={modbusSensorList}
        sensorIdList={sensorIdList}
        setSensorTagId={setSensorTagId}
        setSensorTag={setSensorTag}
      />

      <SensorGraphComponent
        open={open}
        setOpen={setOpen}
        sensorTagId={sensorTagId}
        segretionInterval={segretionInterval}
        setSegretionInterval={setSegretionInterval}
        rangeInterval={rangeInterval}
        setRangeInterval={setRangeInterval}
        sensorTag={sensorTag}
      />
      <AlertModalComponent alertOpen={alertOpen} setAlertOpen={setAlertOpen} locationDetails={deviceId} />
    </div>
  );
}

export default LandingPageComponent;
