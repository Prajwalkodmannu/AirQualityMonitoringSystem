import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navbarComponent/Sidebar';
import Navbar from '../components/navbarComponent/Navbar';
import './css/home.scss';
import { UserAccessProvider } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import {
  FetchBranchService, FetchFacilitiyService, FetchLocationService, NotificationAlerts,
} from '../services/LoginPageService';
import GlobalNotifier from '../components/notification/GlobalNotificationBar';

function HomePageComponent() {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [mobileMenu, setMobileOpen] = useState(true);
  const [notifierState, setNotifierState] = useState({
    open: false,
    message: 'New have new notification !',
    color: '#ffca28', // amber : '#ffca28', green: '#4caf50'
  });
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id,
  } = locationDetails;

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
    const notifierInterval = setInterval(() => {
      NotificationAlerts({ location_id, branch_id, facility_id }, handleNotificationSuccess, handleNotificationException);
      // setNotifierState((oldValue) => {
      //   return { ...oldValue, open: true, color: '#4caf50' };
      // });
    }, 5000);

    return () => {
      clearInterval(notifierInterval);
    };
  }, []);

  const handleSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(location_id)) {
        setLocationLabel(datas.stateName);
      }
    });
  };
  const handleBranchSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(branch_id)) {
        setBranchLabel(datas.branchName);
      }
    });
  };
  const handleFacilitySuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(facility_id)) {
        setFacilityLabel(datas.facilityName);
      }
    });
  };

  const handleException = () => {};

  const handleNotificationSuccess = (dataObject) => {
    setNotificationList(dataObject.data);
    let colorCode = '#4caf50';
    const setColor = dataObject.data.find((data) => {
      const color = data.alertType === 'Critical' ? '#e53935' : data.alertType === 'outOfRange' ? '#ffc107' : colorCode;
      colorCode = color;
      return color;
    });

    setNotifierState((oldValue) => {
      return {
        ...oldValue,
        open: true,
        color: colorCode,
      };
    });
  };

  const handleNotificationException = () => {};

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileMenu);
  };

  return (
    <div className="home">
      <Sidebar handleDrawerToggle={handleDrawerToggle} mobileMenu={mobileMenu} />
      <div className="homeContainer">
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
      </div>
    </div>
  );
}

export default HomePageComponent;
