import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  InputLabel, Select,
  FormControl,
  TextField,
  MenuItem,
  Grid,
  Autocomplete,
  Box,
  DialogTitle,
} from '@mui/material';
import {
  CategoryFetchService,
  DeviceFetchService,
  DynamicUnitListService,
  SensorCategoryFetchService,
  SensorDeployAddService,
  SensorDeployEditService,
  SensorFetchService,
} from '../../services/LoginPageService';
import Analog from './sensorType/AnalogComponent';
import Modbus from './sensorType/ModbusComponent';
import Digital from './sensorType/DigitalComponent';
import AnalogAlert from './sensorType/AnalogAlert';
import ModbusAlert from './sensorType/ModbusAlert';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validation/formValidation';
import StelTWA from './sensorType/StelTWAComponent';
import { useUserAccess } from '../../context/UserAccessProvider';

function DeviceAdd({
  locationDetails, setProgressStatus, editData, isUpdate, setSensorRefresh,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const id = editData?.id || '';
  const [deviceId, setDeviceId] = useState(editData?.deviceId || '');
  const [categoryId, setCategoryId] = useState(editData?.categoryId || '');
  const [sensorTag, setSensorTag] = useState(editData?.sensorTag || '');
  const [categoryList, setCategoryList] = useState([]);
  const [sensorList, setSensorList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [sensorCategoryList, setSensorCategoryList] = useState([]);
  const [alerts, setAlert] = useState('');
  const [sensorCategoryId, setSensorCategoryId] = useState(editData?.sensorCategoryId || '0');
  const [sensorName, setSensorName] = useState(editData?.sensorName || '');
  const [sensorOutput, setSensorOutput] = useState(editData?.sensorOutput || 'Digital');
  // -- Digital --/
  const [digitalAlertType, setDigitalAlertType] = useState(editData?.digitalAlertType || '');
  const [digitalLowAlert, setDigitalLowAlert] = useState(editData?.digitalLowAlert || '');
  const [digitalHighAlert, setDigitalHighAlert] = useState(editData?.digitalHighAlert || '');
  // -----analog----//
  const [sensorType, setSensorType] = useState(editData?.sensorType || '');
  const [relayOutput, setRelayOutput] = useState(editData?.relayOutput || 'ON');
  const [units, setUnits] = useState(editData?.units || '');
  const [unitsList, setUnitsList] = useState([]);
  const [minRatedReading, setMinRatedReading] = useState(editData?.minRatedReading || '');
  const [minRatedReadingChecked, setMinRatedReadingChecked] = useState(editData?.minRatedReadingChecked || '0');
  const [minRatedReadingScale, setMinRatedReadingScale] = useState(editData?.minRatedReadingScale || '');
  const [maxRatedReading, setMaxRatedReading] = useState(editData?.maxRatedReading || '');
  const [maxRatedReadingChecked, setMaxRatedReadingChecked] = useState(editData?.maxRatedReadingChecked || '0');
  const [maxRatedReadingScale, setMaxRatedReadingScale] = useState(editData?.maxRatedReadingScale || '');
  // -Modbus--------//
  const [slaveId, setSlaveId] = useState(editData?.slaveId || '');
  const [registerId, setRegisterId] = useState(editData?.registerId || '');
  const [length, setLength] = useState(editData?.length || '');
  const [registerType, setRegisterType] = useState(editData?.registerType || '');
  const [conversionType, setConversionType] = useState(editData?.conversionType || '');
  const [ipAddress, setIpAddress] = useState(editData?.ipAddress || '');
  const [subnetMask, setSubnetMask] = useState(editData?.subnetMask || '');
  // ---- polling type--------//
  const [pollingIntervalType, setPollingIntervalType] = useState(editData?.pollingIntervalType || '');
  // --- Critical Alert --- //
  const [criticalMinValue, setCriticalMinValue] = useState(editData?.criticalMinValue || '');
  const [criticalMaxValue, setCriticalMaxValue] = useState(editData?.criticalMaxValue || '');
  const [criticalAlertType, setCriticalAlertType] = useState(editData?.criticalAlertType || '');
  const [criticalLowAlert, setCriticalLowAlert] = useState(editData?.criticalLowAlert || '');
  const [criticalHighAlert, setCriticalHighAlert] = useState(editData?.criticalHighAlert || '');
  const [criticalRefMinValue, setRefCriticalMinValue] = useState(editData?.criticalRefMinValue || '');
  const [criticalRefMaxValue, setRefCriticalMaxValue] = useState(editData?.criticalRefMaxValue || '');
  // --- Warning Alert --- //
  const [warningMinValue, setWarningMinValue] = useState(editData?.warningMinValue || '');
  const [warningMaxValue, setWarningMaxValue] = useState(editData?.warningMaxValue || '');
  const [warningAlertType, setWarningAlertType] = useState(editData?.warningAlertType || '');
  const [warningLowAlert, setWarningLowAlert] = useState(editData?.warningLowAlert || '');
  const [warningHighAlert, setWarningHighAlert] = useState(editData?.warningHighAlert || '');
  const [warningRefMinValue, setRefWarningMinValue] = useState(editData?.warningRefMinValue || '');
  const [warningRefMaxValue, setRefWarningMaxValue] = useState(editData?.warningRefMaxValue || '');
  // --- Out-of-Range Alert --- //
  const [outofrangeMinValue, setOutofrangeMinValue] = useState(editData?.outofrangeMinValue || '');
  const [outofrangeMaxValue, setOutofrangeMaxValue] = useState(editData?.outofrangeMaxValue || '');
  const [outofrangeAlertType, setOutofrangeAlertType] = useState(editData?.outofrangeAlertType || '');
  const [outofrangeLowAlert, setOutofrangeLowAlert] = useState(editData?.outofrangeLowAlert || '');
  const [outofrangeHighAlert, setOutofrangeHighAlert] = useState(editData?.outofrangeHighAlert || '');
  const [outofrangeRefMinValue, setRefOutofrangeMinValue] = useState(editData?.outofrangeRefMinValue || '');
  const [outofrangeRefMaxValue, setRefOutofrangeMaxValue] = useState(editData?.outofrangeRefMaxValue || '');
  // ---- STEL & TWA ----------//
  const [alarm, setAlarm] = useState(editData?.alarm || '');

  const [isAQI, setIsAQI] = useState(editData ? editData.isAQI === '1' : false);
  const [isStel, setIsStel] = useState(editData ? editData.isStel === '1' : false);
  const [stelDuration, setStelDuration] = useState(editData?.stelDuration || '');
  const [stelType, setStelType] = useState(editData?.stelType || 'ppm');
  const [stelLimit, setStelLimit] = useState(editData?.stelLimit || 0);
  const [stelAlert, setStelAlert] = useState(editData?.stelAlert || '');
  const [twaDuration, setTwaDuration] = useState(editData?.twaDuration || '');
  const [twaStartTime, setTwaStartTime] = useState(editData?.twaStartTime || '01:05');
  const [stelStartTime, setStelStartTime] = useState(editData?.stelStartTime || '01:05');
  const [twaType, setTwaType] = useState(editData?.twaType || 'ppm');
  const [twaLimit, setTwaLimit] = useState(editData?.twaLimit || 0);
  const [twaAlert, setTwaAlert] = useState(editData?.twaAlert || '');

  const [parmGoodMinScale, setParmGoodMinScale] = useState(editData?.parmGoodMinScale || '');
  const [parmGoodMaxScale, setParmGoodMaxScale] = useState(editData?.parmGoodMaxScale || '');
  const [parmSatisfactoryMinScale, setParmSatisfactoryMinScale] = useState(editData?.parmSatisfactoryMinScale || '');
  const [parmSatisfactoryMaxScale, setParmSatisfactoryMaxScale] = useState(editData?.parmSatisfactoryMaxScale || '');
  const [parmModerateMinScale, setParmModerateMinScale] = useState(editData?.parmModerateMinScale || '');
  const [parmModerateMaxScale, setParmModerateMaxScale] = useState(editData?.parmModerateMaxScale || '');
  const [parmPoorMinScale, setParmPoorMinScale] = useState(editData?.parmPoorMinScale || '');
  const [parmPoorMaxScale, setParmPoorMaxScale] = useState(editData?.parmPoorMaxScale || '');
  const [parmVeryPoorMinScale, setParmVeryPoorMinScale] = useState(editData?.parmVeryPoorMinScale || '');
  const [parmVeryPoorMaxScale, setParmVeryPoorMaxScale] = useState(editData?.parmVeryPoorMaxScale || '');
  const [parmSevereMinScale, setParmSevereMinScale] = useState(editData?.parmSevereMinScale || '');
  const [parmSevereMaxScale, setParmSevereMaxScale] = useState(editData?.parmSevereMaxScale || '');
  // -- Throttling ---//
  const [open, setOpen] = useState(false);
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleException = () => {
  };

  useEffect(() => {
    loadData();
  }, [editData]);

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };

  const deviceHandleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
  };

  const sensorCategoryHandleSuccess = (dataObject) => {
    setSensorCategoryList(dataObject.data);
  };

  const sensorHandleSuccess = (dataObject) => {
    setSensorList(dataObject.data || []);
  };

  const loadData = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
    SensorCategoryFetchService(sensorCategoryHandleSuccess, handleException);
    /* eslint-disable-next-line */
    DeviceFetchService({ ...locationDetails, sensorCategoryId: categoryId }, deviceHandleSuccess, handleException);
    editData?.sensorCategoryId && DynamicUnitListService(editData.sensorCategoryId, handleSensorUnitSuccess, handleSensorUnitException);
  };

  const handleSensorUnitSuccess = (dataObject) => {
    setUnitsList(JSON.parse(dataObject.data[0].measureUnitList?.replace(/\\/g, '').replace(/(^"|"$)/g, '')) || []);
  };

  const handleSensorUnitException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  /* eslint-disable-next-line */
  const deviceChanged = (sensorCategoryId) => {
    setCategoryId(sensorCategoryId);
    DeviceFetchService({ ...locationDetails, sensorCategoryId }, deviceHandleSuccess, handleException);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* eslint-disable-next-line */
    isUpdate
      ? SensorDeployEditService({
        ...locationDetails,
        id,
        categoryId,
        deviceId,
        sensorCategoryId,
        sensorName,
        sensorTag,
        sensorOutput,
        digitalAlertType,
        digitalLowAlert,
        digitalHighAlert,
        sensorType,
        units,
        relayOutput,
        minRatedReading,
        minRatedReadingChecked,
        minRatedReadingScale,
        maxRatedReading,
        maxRatedReadingChecked,
        maxRatedReadingScale,
        slaveId,
        registerId,
        length,
        registerType,
        conversionType,
        ipAddress,
        subnetMask,
        pollingIntervalType,
        criticalMinValue,
        criticalMaxValue,
        criticalAlertType,
        criticalLowAlert,
        criticalHighAlert,
        warningMinValue,
        warningMaxValue,
        warningAlertType,
        warningLowAlert,
        warningHighAlert,
        outofrangeMinValue,
        outofrangeMaxValue,
        outofrangeAlertType,
        outofrangeLowAlert,
        outofrangeHighAlert,
        alarm,
        isAQI,
        isStel,
        stelDuration,
        stelStartTime,
        stelType,
        stelLimit,
        stelAlert,
        twaDuration,
        twaStartTime,
        twaType,
        twaLimit,
        twaAlert,
        parmGoodMinScale,
        parmGoodMaxScale,
        parmSatisfactoryMinScale,
        parmSatisfactoryMaxScale,
        parmModerateMinScale,
        parmModerateMaxScale,
        parmPoorMinScale,
        parmPoorMaxScale,
        parmVeryPoorMinScale,
        parmVeryPoorMaxScale,
        parmSevereMinScale,
        parmSevereMaxScale,
      }, sensorAddSuccess, senserAddException)
      : SensorDeployAddService({
        ...locationDetails,
        categoryId,
        deviceId,
        sensorCategoryId,
        sensorName,
        sensorTag,
        sensorOutput,
        digitalAlertType,
        digitalLowAlert,
        digitalHighAlert,
        sensorType,
        units,
        relayOutput,
        minRatedReading,
        minRatedReadingChecked,
        minRatedReadingScale,
        maxRatedReading,
        maxRatedReadingChecked,
        maxRatedReadingScale,
        slaveId,
        registerId,
        length,
        registerType,
        conversionType,
        ipAddress,
        subnetMask,
        pollingIntervalType,
        criticalMinValue,
        criticalMaxValue,
        criticalAlertType,
        criticalLowAlert,
        criticalHighAlert,
        warningMinValue,
        warningMaxValue,
        warningAlertType,
        warningLowAlert,
        warningHighAlert,
        outofrangeMinValue,
        outofrangeMaxValue,
        outofrangeAlertType,
        outofrangeLowAlert,
        outofrangeHighAlert,
        alarm,
        isAQI,
        isStel,
        stelDuration,
        stelStartTime,
        stelType,
        stelLimit,
        stelAlert,
        twaDuration,
        twaStartTime,
        twaType,
        twaLimit,
        twaAlert,
        parmGoodMinScale,
        parmGoodMaxScale,
        parmSatisfactoryMinScale,
        parmSatisfactoryMaxScale,
        parmModerateMinScale,
        parmModerateMaxScale,
        parmPoorMinScale,
        parmPoorMaxScale,
        parmVeryPoorMinScale,
        parmVeryPoorMaxScale,
        parmSevereMinScale,
        parmSevereMaxScale,
      }, sensorAddSuccess, senserAddException);
  };

  const sensorAddSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(() => {
      resetForm();
      handleClose();
      setProgressStatus(1);
    }, 3000);
    setSensorRefresh((oldvalue) => !oldvalue);
  };

  const senserAddException = (resErrorObject, errorMessage) => {
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

  const resetForm = () => {
    setCategoryId('');
    setDeviceId('');
    setDeviceList([]);
    setSensorCategoryId('');
    setSensorList([]);
    setSensorTag('');
    setDigitalAlertType('');
    setDigitalLowAlert('');
    setDigitalHighAlert('');
    setPollingIntervalType('');
    setCriticalAlertType('');
    setCriticalLowAlert('');
    setCriticalHighAlert('');
    setWarningAlertType('');
    setWarningLowAlert('');
    setWarningHighAlert('');
    setOutofrangeAlertType('');
    setOutofrangeLowAlert('');
    setOutofrangeHighAlert('');
    clearSensorSpecification();
  };

  const clearSensorSpecification = () =>{
    setSensorName('');
    setSensorOutput('Digital');
    setSensorType('');
    // -- analog --//
    setUnits('');
    setRelayOutput('ON');
    setMinRatedReading('');
    setMinRatedReadingChecked(false);
    setMinRatedReadingScale('');
    setMaxRatedReading('');
    setMaxRatedReadingChecked(false);
    setMaxRatedReadingScale('');
    // --modbus--/
    setIpAddress('');
    setSubnetMask('');
    setSlaveId('');
    setRegisterId('');
    setLength('');
    setRegisterType('');
    setConversionType('');
    // -- STEL&TWA -- //
    setAlarm('');
    setIsAQI(false);
    setIsStel(false);
    setStelDuration('');
    setStelType('');
    setStelLimit(0);
    setStelAlert('');
    setTwaDuration('');
    setTwaStartTime('01:05');
    setStelStartTime('01:05');
    setTwaType('');
    setTwaLimit(0);
    setTwaAlert('');
    setParmGoodMinScale('');
    setParmGoodMaxScale('');
    setParmSatisfactoryMinScale('');
    setParmSatisfactoryMaxScale('');
    setParmModerateMinScale('');
    setParmModerateMaxScale('');
    setParmPoorMinScale('');
    setParmPoorMaxScale('');
    setParmVeryPoorMinScale('');
    setParmVeryPoorMaxScale('');
    setParmSevereMinScale('');
    setParmSevereMaxScale('');
    // --MIN & Max Alert Range-- //
    setCriticalMinValue('');
    setRefCriticalMinValue('');
    setCriticalMaxValue('');
    setRefCriticalMaxValue('');
    setWarningMinValue('');
    setRefWarningMinValue('');
    setWarningMaxValue('');
    setRefWarningMaxValue('');
    setOutofrangeMinValue('');
    setRefOutofrangeMinValue('');
    setOutofrangeMaxValue('');
    setRefOutofrangeMaxValue('');
  }

  return (
    <div className="w-full" style={{ marginTop: 0, overflow: 'auto',}}>
      <form className="mt-0 p-0 w-full" onSubmit={handleSubmit} >
        <DialogContent
          sx={{ px: 0, p: isUpdate ? '10px' : '0px' }}
          style={{
            height: '78vh',
          }}
        >
          <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px' }}>
            {isUpdate ? 'Edit' : 'Add'} Sensor
          </DialogTitle>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Device Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    required
                    disabled={editData && true}
                    label="Device Category"
                    onChange={(e) => {
                      setDeviceList([]);
                      deviceChanged(e.target.value);
                    }}
                    error={errorObject?.deviceCategory?.errorStatus}
                    helperText={errorObject?.deviceCategory?.helperText}
                  >
                    {categoryList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.categoryName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Device Name
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deviceId}
                    required
                    disabled={editData && true}
                    label="Device Name"
                    onChange={(e) => {
                      setDeviceId(e.target.value);
                    }}
                  >
                    {deviceList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Sensor Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorCategoryId}
                    required
                    disabled={editData && true}
                    label="Sensor Category"
                    onChange={(e) => {
                      setSensorCategoryId(e.target.value);
                      setSensorList([]);
                      SensorFetchService(e.target.value, sensorHandleSuccess, handleException);
                      clearSensorSpecification();
                    }}
                  >
                    {sensorCategoryList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.sensorName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {editData
              ? (
                <Grid
                  sx={{ mt: 0, padding: 0 }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className="rounded-md -space-y-px">
                    <TextField
                      value={editData?.sensorNameUnit}
                      disabled
                      fullWidth
                    />
                  </div>
                </Grid>
              )
              : (
                <Grid
                  sx={{ mt: 0, padding: 0 }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Box>
                    <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                      <InputLabel id="demo-simple-select-label">
                        Sensor Name
                      </InputLabel>
                      <Select
                        sx={{ minWidth: 250 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sensorName}
                        required
                        disabled={editData && true}
                        label="Sensor Category"
                        onChange={(e) => {
                          setSensorName(e.target.value || '');
                          var result = sensorList.filter(obj => {
                            return obj.id === e.target.value
                          });
                          setSensorOutput(result[0]?.sensorOutput || 'Digital');
                          setSensorType(result[0]?.sensorType || '');
                          // -- analog --//
                          setUnits(result[0]?.units || '');
                          setRelayOutput(result[0]?.relayOutput || 'ON');
                          setMinRatedReading(result[0]?.minRatedReading || '');
                          setMinRatedReadingChecked(result[0]?.minRatedReadingChecked || false);
                          setMinRatedReadingScale(result[0]?.minRatedReadingScale || '');
                          setMaxRatedReading(result[0]?.maxRatedReading || '');
                          setMaxRatedReadingChecked(result[0]?.maxRatedReadingChecked || false);
                          setMaxRatedReadingScale(result[0]?.maxRatedReadingScale || '');
                          // --modbus--/
                          setIpAddress(result[0]?.ipAddress );
                          setSubnetMask(result[0]?.subnetMask);
                          setSlaveId(result[0]?.slaveId);
                          setRegisterId(result[0]?.registerId);
                          setLength(result[0]?.length);
                          setRegisterType(result[0]?.registerType);
                          setConversionType(result[0]?.conversionType);
                          // -- STEL&TWA -- //
                          setAlarm(result[0]?.alarm);
                          setIsAQI(result[0]?.isAQI === '1' || false);
                          setIsStel(result[0]?.isStel === '1' || false);
                          setStelDuration(result[0]?.stelDuration);
                          setStelType(result[0]?.stelType);
                          setStelLimit(result[0]?.stelLimit || 0);
                          setStelAlert(result[0]?.stelAlert);
                          setTwaDuration(result[0]?.twaDuration);
                          setTwaStartTime(result[0]?.twaStartTime || '01:05');
                          setStelStartTime(result[0]?.stelStartTime || '01:05');
                          setTwaType(result[0]?.twaType);
                          setTwaLimit(result[0]?.twaLimit || 0);
                          setTwaAlert(result[0]?.twaAlert);
                          setParmGoodMinScale(result[0]?.parmGoodMinScale);
                          setParmGoodMaxScale(result[0]?.parmGoodMaxScale);
                          setParmSatisfactoryMinScale(result[0]?.parmSatisfactoryMinScale);
                          setParmSatisfactoryMaxScale(result[0]?.parmSatisfactoryMaxScale);
                          setParmModerateMinScale(result[0]?.parmModerateMinScale);
                          setParmModerateMaxScale(result[0]?.parmModerateMaxScale);
                          setParmPoorMinScale(result[0]?.parmPoorMinScale);
                          setParmPoorMaxScale(result[0]?.parmPoorMaxScale);
                          setParmVeryPoorMinScale(result[0]?.parmVeryPoorMinScale);
                          setParmVeryPoorMaxScale(result[0]?.parmVeryPoorMaxScale);
                          setParmSevereMinScale(result[0]?.parmSevereMinScale);
                          setParmSevereMaxScale(result[0]?.parmSevereMaxScale);
                          // --MIN & Max Alert Range-- //
                          setCriticalMinValue(result[0]?.criticalMinValue);
                          setRefCriticalMinValue(result[0]?.criticalMinValue);
                          setCriticalMaxValue(result[0]?.criticalMaxValue);
                          setRefCriticalMaxValue(result[0]?.criticalMaxValue);
                          setWarningMinValue(result[0]?.warningMinValue);
                          setRefWarningMinValue(result[0]?.warningMinValue);
                          setWarningMaxValue(result[0]?.warningMaxValue);
                          setRefWarningMaxValue(result[0]?.warningMaxValue);
                          setOutofrangeMinValue(result[0]?.outofrangeMinValue);
                          setRefOutofrangeMinValue(result[0]?.outofrangeMinValue);
                          setOutofrangeMaxValue(result[0]?.outofrangeMaxValue);
                          setRefOutofrangeMaxValue(result[0]?.outofrangeMaxValue);
                        }}
                      >
                        {sensorList.map((data) => {
                          return (
                            <MenuItem value={data.id}>{data.sensorName}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              )}
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <div className="rounded-md -space-y-px">
                <TextField
                  sx={{ marginTop: 0 }}
                  value={sensorTag}
                  disabled={moduleAccess.edit === false && true}
                  onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                  onChange={(e) => {
                    setSensorTag(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Sensor Tag"
                  fullWidth
                  error={errorObject?.sensorTag?.errorStatus}
                  helperText={errorObject?.sensorTag?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: 0 }}
                  disabled
                >
                  <InputLabel id="demo-simple-select-label">
                    Sensor Output
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorOutput}
                    required
                    label="Sensor Output"
                    onChange={(e) => {
                      setSensorOutput(e.target.value);
                    }}
                  >
                    <MenuItem value="Digital">Digital</MenuItem>
                    <MenuItem value="Analog">Analog</MenuItem>
                    <MenuItem value="Modbus">Modbus</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <Grid
              sx={{ mt: 0, padding: 0, alignSelf: 'center' }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                <InputLabel id="demo-simple-select-label3">Alarm Type</InputLabel>
                <Select
                  sx={{ marginTop: 0 }}
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select3"
                  value={alarm}
                  disabled={moduleAccess.edit === false && true}
                  label="Alarm Type"
                  required
                  onChange={(e) => {
                    setAlarm(e.target.value);
                  }}
                >
                  <MenuItem value="Latch">Latch</MenuItem>
                  <MenuItem value="UnLatch">UnLatch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <StelTWA
            disable
            isStel={isStel}
            setIsStel={setIsStel}
            isAQI={isAQI}
            setIsAQI={setIsAQI}
            stelDuration={stelDuration}
            setStelDuration={setStelDuration}
            stelType={stelType}
            setStelType={setStelType}
            stelLimit={stelLimit}
            setStelLimit={setStelLimit}
            stelAlert={stelAlert}
            setStelAlert={setStelAlert}
            twaDuration={twaDuration}
            setTwaDuration={setTwaDuration}
            twaStartTime={twaStartTime}
            setTwaStartTime={setTwaStartTime}
            stelStartTime={stelStartTime}
            setStelStartTime={setStelStartTime}
            twaType={twaType}
            setTwaType={setTwaType}
            twaLimit={twaLimit}
            setTwaLimit={setTwaLimit}
            twaAlert={twaAlert}
            setTwaAlert={setTwaAlert}
            parmGoodMinScale={parmGoodMinScale}
            setParmGoodMinScale={setParmGoodMinScale}
            parmGoodMaxScale={parmGoodMaxScale}
            setParmGoodMaxScale={setParmGoodMaxScale}
            parmSatisfactoryMinScale={parmSatisfactoryMinScale}
            setParmSatisfactoryMinScale={setParmSatisfactoryMinScale}
            parmSatisfactoryMaxScale={parmSatisfactoryMaxScale}
            setParmSatisfactoryMaxScale={setParmSatisfactoryMaxScale}
            parmModerateMinScale={parmModerateMinScale}
            setParmModerateMinScale={setParmModerateMinScale}
            parmModerateMaxScale={parmModerateMaxScale}
            setParmModerateMaxScale={setParmModerateMaxScale}
            parmPoorMinScale={parmPoorMinScale}
            setParmPoorMinScale={setParmPoorMinScale}
            parmPoorMaxScale={parmPoorMaxScale}
            setParmPoorMaxScale={setParmPoorMaxScale}
            parmVeryPoorMinScale={parmVeryPoorMinScale}
            setParmVeryPoorMinScale={setParmVeryPoorMinScale}
            parmVeryPoorMaxScale={parmVeryPoorMaxScale}
            setParmVeryPoorMaxScale={setParmVeryPoorMaxScale}
            parmSevereMinScale={parmSevereMinScale}
            setParmSevereMinScale={setParmSevereMinScale}
            parmSevereMaxScale={parmSevereMaxScale}
            setParmSevereMaxScale={setParmSevereMaxScale}
          />
          {/* eslint-disable-next-line */}
          {sensorOutput === 'Analog'
            ? (
              <>
                <Analog
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  disable
                  units={units}
                  unitsList={unitsList}
                  setUnits={setUnits}
                  sensorType={sensorType}
                  setSensorType={setSensorType}
                  relayOutput={relayOutput}
                  setRelayOutput={setRelayOutput}
                  minRatedReading={minRatedReading}
                  setMinRatedReading={setMinRatedReading}
                  minRatedReadingChecked={minRatedReadingChecked}
                  setMinRatedReadingChecked={setMinRatedReadingChecked}
                  minRatedReadingScale={minRatedReadingScale}
                  setMinRatedReadingScale={setMinRatedReadingScale}
                  maxRatedReading={maxRatedReading}
                  setMaxRatedReading={setMaxRatedReading}
                  maxRatedReadingChecked={maxRatedReadingChecked}
                  setMaxRatedReadingChecked={setMaxRatedReadingChecked}
                  maxRatedReadingScale={maxRatedReadingScale}
                  setMaxRatedReadingScale={setMaxRatedReadingScale}
                />
                <AnalogAlert
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  pollingIntervalType={pollingIntervalType}
                  setPollingIntervalType={setPollingIntervalType}
                  criticalMinValue={criticalMinValue}
                  criticalRefMinValue={criticalRefMinValue}
                  setCriticalMinValue={setCriticalMinValue}
                  criticalMaxValue={criticalMaxValue}
                  criticalRefMaxValue={criticalRefMaxValue}
                  setCriticalMaxValue={setCriticalMaxValue}
                  criticalAlertType={criticalAlertType}
                  setCriticalAlertType={setCriticalAlertType}
                  criticalLowAlert={criticalLowAlert}
                  setCriticalLowAlert={setCriticalLowAlert}
                  criticalHighAlert={criticalHighAlert}
                  setCriticalHighAlert={setCriticalHighAlert}
                  warningMinValue={warningMinValue}
                  warningRefMinValue={warningRefMinValue}
                  setWarningMinValue={setWarningMinValue}
                  warningMaxValue={warningMaxValue}
                  warningRefMaxValue={warningRefMaxValue}
                  setWarningMaxValue={setWarningMaxValue}
                  warningAlertType={warningAlertType}
                  setWarningAlertType={setWarningAlertType}
                  warningLowAlert={warningLowAlert}
                  setWarningLowAlert={setWarningLowAlert}
                  warningHighAlert={warningHighAlert}
                  setWarningHighAlert={setWarningHighAlert}
                  outofrangeMinValue={outofrangeMinValue}
                  outofrangeRefMinValue={outofrangeRefMinValue}
                  setOutofrangeMinValue={setOutofrangeMinValue}
                  outofrangeMaxValue={outofrangeMaxValue}
                  outofrangeRefMaxValue={outofrangeRefMaxValue}
                  setOutofrangeMaxValue={setOutofrangeMaxValue}
                  outofrangeAlertType={outofrangeAlertType}
                  setOutofrangeAlertType={setOutofrangeAlertType}
                  outofrangeLowAlert={outofrangeLowAlert}
                  setOutofrangeLowAlert={setOutofrangeLowAlert}
                  outofrangeHighAlert={outofrangeHighAlert}
                  setOutofrangeHighAlert={setOutofrangeHighAlert}
                  alerts={alerts}
                  setAlert={setAlert}
                />
              </>
            )
            : sensorOutput === 'Modbus'
              ? (
                <>
                  <Modbus
                    errorObject={errorObject}
                    setErrorObject={setErrorObject}
                    disable
                    units={units}
                    unitsList={unitsList}
                    setUnits={setUnits}
                    sensorType={sensorType}
                    setSensorType={setSensorType}
                    relayOutput={relayOutput}
                    setRelayOutput={setRelayOutput}
                    minRatedReading={minRatedReading}
                    setMinRatedReading={setMinRatedReading}
                    minRatedReadingChecked={minRatedReadingChecked}
                    setMinRatedReadingChecked={setMinRatedReadingChecked}
                    minRatedReadingScale={minRatedReadingScale}
                    setMinRatedReadingScale={setMinRatedReadingScale}
                    maxRatedReading={maxRatedReading}
                    setMaxRatedReading={setMaxRatedReading}
                    maxRatedReadingChecked={maxRatedReadingChecked}
                    setMaxRatedReadingChecked={setMaxRatedReadingChecked}
                    maxRatedReadingScale={maxRatedReadingScale}
                    setMaxRatedReadingScale={setMaxRatedReadingScale}
                    slaveId={slaveId}
                    setSlaveId={setSlaveId}
                    registerId={registerId}
                    setRegisterId={setRegisterId}
                    length={length}
                    setLength={setLength}
                    registerType={registerType}
                    setRegisterType={setRegisterType}
                    conversionType={conversionType}
                    setConversionType={setConversionType}
                    ipAddress={ipAddress}
                    setIpAddress={setIpAddress}
                    subnetMask={subnetMask}
                    setSubnetMask={setSubnetMask}
                  />
                  <ModbusAlert
                    pollingIntervalType={pollingIntervalType}
                    setPollingIntervalType={setPollingIntervalType}
                    criticalMinValue={criticalMinValue}
                    setCriticalMinValue={setCriticalMinValue}
                    criticalRefMinValue={criticalRefMinValue}
                    criticalMaxValue={criticalMaxValue}
                    setCriticalMaxValue={setCriticalMaxValue}
                    criticalRefMaxValue={criticalRefMaxValue}
                    criticalAlertType={criticalAlertType}
                    setCriticalAlertType={setCriticalAlertType}
                    criticalLowAlert={criticalLowAlert}
                    setCriticalLowAlert={setCriticalLowAlert}
                    criticalHighAlert={criticalHighAlert}
                    setCriticalHighAlert={setCriticalHighAlert}
                    warningMinValue={warningMinValue}
                    setWarningMinValue={setWarningMinValue}
                    warningRefMinValue={warningRefMinValue}
                    warningMaxValue={warningMaxValue}
                    setWarningMaxValue={setWarningMaxValue}
                    warningRefMaxValue={warningRefMaxValue}
                    warningAlertType={warningAlertType}
                    setWarningAlertType={setWarningAlertType}
                    warningLowAlert={warningLowAlert}
                    setWarningLowAlert={setWarningLowAlert}
                    warningHighAlert={warningHighAlert}
                    setWarningHighAlert={setWarningHighAlert}
                    outofrangeMinValue={outofrangeMinValue}
                    setOutofrangeMinValue={setOutofrangeMinValue}
                    outofrangeRefMinValue={outofrangeRefMinValue}
                    outofrangeMaxValue={outofrangeMaxValue}
                    setOutofrangeMaxValue={setOutofrangeMaxValue}
                    outofrangeRefMaxValue={outofrangeRefMaxValue}
                    outofrangeAlertType={outofrangeAlertType}
                    setOutofrangeAlertType={setOutofrangeAlertType}
                    outofrangeLowAlert={outofrangeLowAlert}
                    setOutofrangeLowAlert={setOutofrangeLowAlert}
                    outofrangeHighAlert={outofrangeHighAlert}
                    setOutofrangeHighAlert={setOutofrangeHighAlert}
                    alerts={alerts}
                    setAlert={setAlert}
                  />
                </>
              )
              : (
                <Digital
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  digitalAlertType={digitalAlertType}
                  setDigitalAlertType={setDigitalAlertType}
                  digitalLowAlert={digitalLowAlert}
                  setDigitalLowAlert={setDigitalLowAlert}
                  digitalHighAlert={digitalHighAlert}
                  setDigitalHighAlert={setDigitalHighAlert}
                />
              )}

          <div className="float-right">
            <Button
              size="large"
              onClick={() => {
                setErrorObject({});
                resetForm();
                /* eslint-disable-next-line */
                setProgressStatus && (setProgressStatus(1));
              }}
            >
              Cancel
            </Button>
            {moduleAccess.edit === true
              && (
                <Button
                  sx={{ m: 1 }}
                  size="large"
                  type="submit"
                >
                  {isUpdate ? 'UPDATE' : 'ADD'}
                </Button>
              )}
          </div>
        </DialogContent>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}

export default DeviceAdd;
