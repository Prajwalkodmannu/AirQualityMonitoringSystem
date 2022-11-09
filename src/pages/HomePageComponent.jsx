import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navbarComponent/Sidebar';
import Navbar from '../components/navbarComponent/Navbar';
import './css/home.scss';
import { LatestAlertProvider, UserAccessProvider } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import {
  BuildingFetchService,
  DeviceFetchService,
  FetchBranchService, FetchFacilitiyService, FetchLocationService, FloorfetchService, LabfetchService, NotificationAlerts,
} from '../services/LoginPageService';
import GlobalNotifier from '../components/notification/GlobalNotificationBar';
import { alertSeverityCode, setAlertColor } from '../utils/helperFunctions';
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable radix */

function HomePageComponent() {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [buildingLabel, setBuildingLabel] = useState('');
  const [floorLabel, setFloorLabel] = useState('');
  const [labLabel, setLabLabel] = useState('');
  const [mobileMenu, setMobileOpen] = useState(true);
  const [notifierState, setNotifierState] = useState({
    open: false,
    message: 'You have new notification !',
    color: '#ffca28', // amber : '#ffca28', green: '#4caf50'
  });
  const [newNotification, setNewNotification] = useState(false);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const { notificationList } = ApplicationStore().getStorage('notificationDetails');
  const { locationDetails, userDetails, intervalDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id, building_id, floor_id, lab_id
  } = locationDetails;

  const { locationIdList, branchIdList, facilityIdList, buildingIdList, floorIdList,
    labIdList, deviceIdList, sensorIdList, } = ApplicationStore().getStorage('alertDetails');
  const intervalSec = intervalDetails.alertLogInterval * 1000 || 10000;
  const [labelCount, setLabelCount] = useState(0);
  const [lableCountLoop, setLableCountLoop] = useState(false);

  useEffect(() => {
    console.log('Interval running...');
    if (userDetails.userRole !== 'superAdmin') {
      ApplicationStore().setStorage('siteDetails', {
        locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, labLabel
      });
      const notifierInterval = setInterval(() => {
        NotificationAlerts({ location_id, branch_id, facility_id, building_id, floor_id, lab_id }, handleNotificationSuccess, handleNotificationException);
      }, intervalSec); // set to 'intervalSec' after testing alert call

      return () => {
        clearInterval(notifierInterval);
      };
    }
  });

  useEffect(() => {
    if (userDetails.userRole !== 'superAdmin') {
      if (lab_id) {
        fetchLab();
      } else if (floor_id) {
        fetchFloor();
      } else if (building_id) {
        fetchBuilding();
      } else if (facility_id) {
        fetchFacility();
      } else if (branch_id) {
        fetchBranch();
      } else if (location_id) {
        fetchLocation();
      } else {
        setLabelCount(oldValue => oldValue++);
        FetchLocationService(handleSuccess, handleException);
      }

      // const interVal = setInterval(()=>{
      //   console.log('Interval running...');
      //   if(labelCount === 0){
      //     console.log('Interval clearing...');
      //     ApplicationStore().setStorage('siteDetails', {
      //       locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, labLabel
      //     });
      //     clearInterval(interVal);
      //   }
      // }, 1000);
      // return () => clearInterval(interVal);

    }
  }, []);


  const fetchLocation = () => {
    setLabelCount(oldValue => oldValue + 2);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
  }
  const fetchBranch = () => {
    setLabelCount(oldValue => oldValue + 3);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
  }

  const fetchFacility = () => {
    setLabelCount(oldValue => oldValue + 4);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    BuildingFetchService({ location_id, branch_id, facility_id }, handleBuildingSuccess, handleException);
  }

  const fetchBuilding = () => {
    setLabelCount(oldValue => oldValue + 5);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    BuildingFetchService({ location_id, branch_id, facility_id }, handleBuildingSuccess, handleException);
    FloorfetchService({ location_id, branch_id, facility_id, building_id }, handleFloorSuccess, handleException);
  }

  const fetchFloor = () => {
    setLabelCount(oldValue => oldValue + 6);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    BuildingFetchService({ location_id, branch_id, facility_id }, handleBuildingSuccess, handleException);
    FloorfetchService({ location_id, branch_id, facility_id, building_id }, handleFloorSuccess, handleException);
    LabfetchService({ location_id, branch_id, facility_id, building_id, floor_id }, handleLabSuccess, handleException);
  }

  const fetchLab = () => {
    setLabelCount(oldValue => oldValue + 7);
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    BuildingFetchService({ location_id, branch_id, facility_id }, handleBuildingSuccess, handleException);
    FloorfetchService({ location_id, branch_id, facility_id, building_id }, handleFloorSuccess, handleException);
    LabfetchService({ location_id, branch_id, facility_id, building_id, floor_id }, handleLabSuccess, handleException);
    // DeviceFetchService({location_id, branch_id, facility_id, building_id, floor_id, lab_id}, handleDeviceSuccess, handleException)
  }

  const handleSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(location_id)) {
        setLocationLabel(datas.stateName);
      }
    });
    setLabelCount(oldvalue => oldvalue--);
  };
  const handleBranchSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(branch_id)) {
        setBranchLabel(datas.branchName);
      }
    });
    setLabelCount(oldValue => oldValue--);
  };
  const handleFacilitySuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(facility_id)) {
        setFacilityLabel(datas.facilityName);
      }
    });
    setLabelCount(oldValue => oldValue--);
  };

  const handleBuildingSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(building_id)) {
        setBuildingLabel(datas.buildingName);
      }
    });
    setLabelCount(oldValue => oldValue--);
  };

  const handleFloorSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(floor_id)) {
        setFloorLabel(datas.floorName);
      }
    });
    setLabelCount(oldValue => oldValue--);
  };

  const handleLabSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(lab_id)) {
        setLabLabel(datas.labDepName);
      }
    });
    setLabelCount(oldValue => oldValue--);
  };

  // const handleDeviceSuccess = (dataObject) => {
  //   dataObject?.data.map((datas) => {
  //     if (datas.id === parseInt(lab_id)) {
  //       setLabLabel(datas.facilityName);
  //     }
  //   });
  // };

  const handleException = () => { };

  const handleNotificationSuccess = (dataObject) => {
    // limit the notification count
    let newDataObject = dataObject.data.sort((firstElement, secondElement) => secondElement.id - firstElement.id).slice(0, 12);
    // Check for new alert with existing stack
    const arraySet = newDataObject.filter((object1) => {
      return !notificationList.some((object2) => {
        return object1.id === object2.id;
      });
    });
    // make an alert if we have new alert
    let newNotificationValue = newNotification;
    if (arraySet.length !== 0) {
      setNewNotification((oldValue) => {
        newNotificationValue = !oldValue;
        return !oldValue;
      });
      var colorObject = setAlertColor(arraySet);
      setNotifierState((oldValue) => {
        return {
          ...oldValue,
          open: true,
          color: colorObject.color,
          message: colorObject.message,
        };
      });
      ApplicationStore().setStorage('notificationDetails', { notificationList: newDataObject, newNotification: newNotificationValue });
    }

    ApplicationStore().setStorage('notificationDetails', {
      notificationList: newDataObject,
      newNotification: newNotificationValue
    });

    let updatedAlertDetails = {
      locationIdList: [],
      branchIdList: [],
      facilityIdList: [],
      buildingIdList: [],
      floorIdList: [],
      labIdList: [],
      deviceIdList: [],
      sensorIdList: [],
    };

    newDataObject?.map((data, index) => {
      updatedAlertDetails = {
        locationIdList: [...updatedAlertDetails.locationIdList, {
          id: data.location_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        branchIdList: [...updatedAlertDetails.branchIdList, {
          id: data.branch_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        facilityIdList: [...updatedAlertDetails.facilityIdList, {
          id: data.facility_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        buildingIdList: [...updatedAlertDetails.buildingIdList, {
          id: data.building_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        floorIdList: [...updatedAlertDetails.floorIdList, {
          id: data.floor_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        labIdList: [...updatedAlertDetails.labIdList, {
          id: data.lab_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        deviceIdList: [...updatedAlertDetails.deviceIdList, {
          id: data.deviceId,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        sensorIdList: [...updatedAlertDetails.sensorIdList, {
          id: data.sensorId,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
      };
    });

    ApplicationStore().setStorage('alertDetails', { ...updatedAlertDetails });
  };

  const handleNotificationException = () => { };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileMenu);
  };

  return (
    <div className="home">
      <Sidebar handleDrawerToggle={handleDrawerToggle} mobileMenu={mobileMenu} />
      <div className="homeContainer">
        <LatestAlertProvider >
          <GlobalNotifier
            notifierState={notifierState}
            setNotifierState={setNotifierState}
            anchorElNotification={anchorElNotification}
            setAnchorElNotification={setAnchorElNotification}
          />
          <Navbar
            handleDrawerToggle={handleDrawerToggle}
            mobileMenu={mobileMenu}
            notificationList={notificationList}
            anchorElNotification={anchorElNotification}
            setAnchorElNotification={setAnchorElNotification}
          />
          <UserAccessProvider>
            <Outlet />
          </UserAccessProvider>
        </LatestAlertProvider>
      </div>
    </div>
  );
}

export default HomePageComponent;
