import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';

import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
import ImageMarkerList from './Device/subComponent/imageMarkerList';
import LandingPageComponent from './dashboard/subComponent/siteDetailsComponent/LandingPageComponent';
import DeviceGridComponent from './dashboard/subComponent/siteDetailsComponent/DeviceGridComponent';
import ApplicationStore from '../utils/localStorageUtil';
import { FetchFacilitiyService, FetchBranchService, FetchLocationService, DeviceIdAlerts } from '../services/LoginPageService';
import NotificationBar from './notification/ServiceNotificationBar';

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    location_id: '',
    branch_id: '',
    facility_id: '',
    building_id: '',
    floor_id: '',
    lab_id: '',
    device_id: '',
  });

  const [breadCrumbLabels, setBreadCrumbLabels] = useState({
    stateLabel: 'State',
    branchLabel: 'Branch',
    facilityLabel: 'Facility',
    buildingLabel: 'Building',
    floorLabel: 'Floor',
    lablabel: 'Zone',
    deviceLabel: '',
  });

  const [siteImages, setSiteImages] = useState({
    buildingImage: '',
    floorImage: '',
    labImage: '',
  });

  const [zoomLevel, setZoomLevel] = useState(4);
  const [centerLatitude, setCenterLatitude] = useState(23.500);
  const [centerLongitude, setCenterLongitude] = useState(80.500);

  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [locationState, setProgressState] = useState(0);
  const [Img, setImg] = useState('');
  const imgSrc = `http://varmatrix.com/Aqms/blog/public/${Img}`;
  const [ImageState, setImageState] = useState(0);
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);
  const [isdashboard, setIsDashBoard] = useState(0);
  const [isGeoMap, setIsGeoMap] = useState(true);
  const [alertList, setAlertList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  useEffect(() => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    const { locationLabel, facilityLabel, branchLabel } = ApplicationStore().getStorage('siteDetails');

    setLocationDetails((oldValue) => {
      return {
        ...oldValue,
        location_id: locationDetails.location_id,
        branch_id: locationDetails.branch_id,
        facility_id: locationDetails.facility_id,
      };
    });
    setBreadCrumbLabels((oldValue) => {
      return {
        ...oldValue, stateLabel: locationLabel, branchLabel, facilityLabel,
      };
    });
    setProgressState((oldValue) => {
      let newValue = 0;
      if (locationDetails.facility_id) {
        newValue = 3;
        fetchFacility();
        locationAlerts({facility_id: locationDetails.facility_id});
      } else if (locationDetails.branch_id) {
        newValue = 2;
        fetchBranch();
        locationAlerts({branch_id: locationDetails.branch_id});
      } else if (locationDetails.location_id) {
        newValue = 1;
        fetchBranch();
        locationAlerts({location_id: locationDetails.location_id});
      } else {
        fetchLocation();
        locationAlerts({});
      }
      return newValue;
    });
  }, []);

  const fetchLocation = () => {
    FetchLocationService(handleLocationSuccess, handleBranchException);
    locationAlerts({});
  };

  const handleLocationSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.stateName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(newArray[0]?.position.lng));
  };

  const fetchBranch = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    FetchBranchService({
      location_id: locationDetails.location_id,
    }, handleBranchSuccess, handleBranchException);
    locationAlerts({location_id: locationDetails.location_id});
  };

  const handleBranchSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(newArray[0]?.position.lng));
  };

  const handleBranchException = (errorObject) => { };

  const fetchFacility = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    FetchFacilitiyService({
      location_id: locationDetails?.location_id,
      branch_id: locationDetails?.branch_id,
    }, handleFetchSuccess, handleFetchException);
    locationAlerts({
      location_id: locationDetails?.location_id,
      branch_id: locationDetails?.branch_id,
    });
  };

  const handleFetchSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(newArray[0]?.position.lng));
  };

  const handleFetchException = (errorObject) => { };

  const locationAlerts = (alertLocationDetails) =>{
    DeviceIdAlerts(alertLocationDetails, handleSuccessAlerts, handleExceptionAlerts);
  }

  const handleSuccessAlerts = (dataObject) => {  
    setAlertList(dataObject.data || []);
  }

  const handleExceptionAlerts = () => { };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  
  return (
    <Grid container spacing={1} style={{ height: '100%', width: '100%', padding: 2 }}>
      {isdashboard === 0
        && (
          <div style={{ height: '100%', width: '100%' }}>
            <Grid
              item
              xs={12}
              style={{
                height: '140%',
                width: '100%',
              }}
              sx={{
                marginLeft: 1,
              }}
            >
              <Grid
                container
                item
                xs={12}
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  sx={{
                  }}
                  style={{ minHeight: '300px', height: '50%', marginTop: 10 }}
                >
                  <LocationGridWidget
                    setLocationCoordinationList={setLocationCoordinationList}
                    locationState={locationState}
                    setProgressState={setProgressState}
                    setImg={setImg}
                    setImageState={setImageState}
                    locationDetails={locationDetails}
                    setLocationDetails={setLocationDetails}
                    setDeviceCoordsList={setDeviceCoordsList}
                    setIsDashBoard={setIsDashBoard}
                    setIsGeoMap={setIsGeoMap}
                    siteImages={siteImages}
                    setSiteImages={setSiteImages}
                    setZoomLevel={setZoomLevel}
                    setCenterLatitude={setCenterLatitude}
                    setCenterLongitude={setCenterLongitude}
                    breadCrumbLabels={breadCrumbLabels}
                    setBreadCrumbLabels={setBreadCrumbLabels}
                    setAlertList={setAlertList}
                    locationAlerts={locationAlerts}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{
                    border: '2px solid black', height: '50%', minHeight: '304px', maxHeight: '300px', marginTop: 10,
                  }}
                >
                  {/* eslint-disable-next-line */}
                  {isGeoMap === true ? <GeoLocationWidget locationCoordination={locationCoordinationList} zoomLevel={zoomLevel} centerLatitude={centerLatitude} centerLongitude={centerLongitude} height="300px" />
                    : <ImageMarkerList labImage={imgSrc} deviceCoordsList={deviceCoordsList} height="h-72" />}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    padding: 1,
                    marginLeft: 1,
                    height: '50%',
                  }}
                >
                  <AlertWidget dataList={alertList} setAlertList={setAlertList} setNotification={setNotification} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      {isdashboard === 1
        && (
          <Grid
            item
            xs={12}
            sx={{
              marginLeft: 1,
            }}
          >
            <LandingPageComponent locationDetails={locationDetails} setIsDashBoard={setIsDashBoard} />
          </Grid>
        )}
      {isdashboard === 2
        && (
          <DeviceGridComponent
            setImg={setImg}
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
            setDeviceCoordsList={setDeviceCoordsList}
            setProgressState={setProgressState}
            breadCrumbLabels={breadCrumbLabels}
            setBreadCrumbLabels={setBreadCrumbLabels}
            setIsDashBoard={setIsDashBoard}
            setIsGeoMap={setIsGeoMap}
            siteImages={siteImages}
            setSiteImages={setSiteImages}
            setCenterLatitude={setCenterLatitude}
            setCenterLongitude={setCenterLongitude}
            locationAlerts={locationAlerts}
          />
        )}
        <NotificationBar
          handleClose={handleClose}
          notificationContent={openNotification.message}
          openNotification={openNotification.status}
          type={openNotification.type}
        />
    </Grid>
  );
}

export default Dashboard;
