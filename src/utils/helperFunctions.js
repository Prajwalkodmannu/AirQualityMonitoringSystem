export function getFullDate(date) {
  const userDateObject = new Date(date);
  const userMonth = `0${userDateObject.getMonth() + 1}`;
  const userDate = `${userDateObject.getDate()}:${userMonth.slice(-2)}:${userDateObject.getFullYear()}`;
  return userDate;
}

export function getFullTime(date) {
  const userDateObject = new Date(date);
  const userHours = `0${userDateObject.getHours()}`;
  const userMinutes = `0${userDateObject.getMinutes()}`;
  const userTime = `${userHours.slice(-2)}:${userMinutes.slice(-2)}`;
  return userTime;
}

export function alertSeverityCode(alertType){
  return alertType === 'Critical'? 1 : alertType === 'Warning'? 2 : alertType === 'outOfRange'? 3 : 4;
}

function handleSwitchcase(alertStatus, colorCode, defaultCase, case1, case2, case3){
  let newColorCode = colorCode || '#a5d6a7';
  switch(alertStatus){
    case 1 : newColorCode = case1 || '#ef9a9a';
      break;
    case 2 : newColorCode = case2 || '#ffb74d';
      break;
    case 3 : newColorCode = case3 || '#ce93d8';
      break;
    default : newColorCode = defaultCase || '#a5d6a7';
      break;
  }
  return newColorCode;
}

export function setAlertColor(newNotificationStack){
  if (newNotificationStack.length > 0) {
    let colorCode = {
      priority: 3,
      color: '#ab47bc',
      message: 'Alert'
    };
    for(let i = 0; i < newNotificationStack.length; i++) {
      if (newNotificationStack[i].alertType === 'Critical') {
        colorCode = {
          priority: 1,
          color: '#E53935',
          message: 'Critical Alert'
        };
        break;
      } else if(newNotificationStack[i].alertType === 'Warning') {
        colorCode = {
          priority: 2,
          color: '#ff9800',
          message: 'Warning'
        }
      } else if(newNotificationStack[i].alertType === 'outOfRange') {
        colorCode = {
          priority: 3,
          color: '#ab47bc',
          message: 'Out Of Range Alert'
        }
      }
    }
    return colorCode;
  }
}

export function getDeviceBackgroundColor(deviceMode, alertStatus, disconnectedStatus){
  let colorCode = '#a5d6a7';
    if(deviceMode === 'disabled' || disconnectedStatus === 1) {
      colorCode = '#9e9e9e';
    } else {
      if(deviceMode === 'bumpTest' || deviceMode === 'calibration' || deviceMode === 'firmwareUpgradation' || deviceMode === 'config'){
        colorCode = '#f8bbd0';
      } else if(deviceMode === 'enabled'){
        colorCode = handleSwitchcase(alertStatus, colorCode, '#a5d6a7', '#ef9a9a', '#ffb74d', '#ce93d8');
      }
    }
  return colorCode;
}

export function getDeviceHeaderColor(deviceMode, alertStatus, disconnectedStatus){
  let colorCode = '#212121';
  if(deviceMode === 'disabled' || disconnectedStatus === 1) {
    colorCode = '#212121';
  } else {
    if(deviceMode === 'bumpTest' || deviceMode === 'calibration' || deviceMode === 'firmwareUpgradation' || deviceMode === 'config'){
      colorCode = '#c2185b';
    } else if(deviceMode === 'enabled'){
      colorCode = handleSwitchcase(alertStatus, colorCode, '#1b5e20', '#b71c1c', '#e65100', '#4a148c');
    }
  }
  return colorCode;
}

export function getDeviceModeColor(deviceMode){
  let colorCode = '#212121';
  if(deviceMode === 'disabled') {
    colorCode = '#212121';
  } else {
    if(deviceMode === 'bumpTest' || deviceMode === 'calibration' || deviceMode === 'firmwareUpgradation' || deviceMode === 'config'){
      colorCode = '#c2185b';
    } else if(deviceMode === 'enabled'){
      colorCode = '#1b5e20';
    }
  }
  return colorCode;
}

export function getSensorBackgroundColor(sensorStatus, alertStatus){
  let colorCode = '#a5d6a7';
    if(sensorStatus === '0') {
      colorCode = '#9e9e9e';
    } else {
      colorCode = handleSwitchcase(alertStatus, colorCode, '#a5d6a7', '#ef9a9a', '#ffb74d', '#ce93d8');
    }
  return colorCode;
}

export function getSensorHeaderColor(sensorStatus, alertStatus){
  let colorCode = '#212121';
    if(sensorStatus === '0') {
      colorCode = '#212121';
    } else {
      colorCode = handleSwitchcase(alertStatus, colorCode, '#1b5e20', '#b71c1c', '#e65100', '#4a148c');
    }
  return colorCode;
}

export function setAlertStatusCode(element, data, setAlertStatus){
  if(element.alertPriority > data.alertPriority){
    switch(data.alertType){
      case 'Critical' : setAlertStatus(1);
      break;
      case 'Warning' : setAlertStatus(2);
      break;
      case 'outOfRange' : setAlertStatus(3);
      break;
      default : break;
    }
  }
}

export function setAlertPriorityAndType(element, data){
  return element.alertPriority < data.alertPriority ? element : 
  {
    alertLabel: data.alertType === 'Critical' ? 'Critical' : data.alertType === 'outOfRange' ? 'Out Of Range' : data.alertType === 'Warning' ? 'Warning' : 'Good',
    alertColor: data.alertType === 'Critical' ? 'red' : data.alertType === 'outOfRange' ? '#9c27b0' : data.alertType === 'Warning' ? 'orange' : 'green',
    alertPriority: data.alertType === 'Critical' ? 1 : data.alertType === 'outOfRange' ? 2 : data.alertType === 'Warning' ? 3: 4,
  };
}

export function setAQIColor(value){
  var color = '#FF0D86';
  if(value>0){
    if(value<=50){
      color = '#38B261';
    } else if(value<=100){
      color = '#D19D00';
    } else if(value<=150){
      color = '#FFA500';
    } else if(value<=200){
      color = '#FF0000';
    } else if(value<=300){
      color = '#A020F0';
    } else {
      color = '#800000';
    }
  }else{
    color = '#FF0D86';
  }
  return color;
}