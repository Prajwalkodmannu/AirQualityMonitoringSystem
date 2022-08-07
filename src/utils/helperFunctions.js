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
          color: '#ab47bc',
          message: 'Warning'
        }
      } else if(newNotificationStack[i].alertType === 'outOfRange') {
        colorCode = {
          priority: 3,
          color: '#ff9800',
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
        switch(alertStatus){
          case 1 : colorCode = '#ef9a9a';
            break;
          case 2 : colorCode = '#ffb74d';
            break;
          case 3 : colorCode = '#ce93d8';
            break;
          default : colorCode = '#a5d6a7';
            break;
        }
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
      switch(alertStatus){
        case 1 : colorCode = '#b71c1c';
          break;
        case 2 : colorCode = '#e65100';
          break;
        case 3 : colorCode = '#4a148c';
          break;
        default : colorCode = '#1b5e20';
          break;
      }
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
        switch(alertStatus){
          case 1 : colorCode = '#ef9a9a';
            break;
          case 2 : colorCode = '#ffb74d';
            break;
          case 3 : colorCode = '#ce93d8';
            break;
          default : colorCode = '#a5d6a7';
          break;
        }
    }
  return colorCode;
}

export function getSensorHeaderColor(sensorStatus, alertStatus){
  let colorCode = '#212121';
    if(sensorStatus === '0') {
      colorCode = '#212121';
    } else {
        switch(alertStatus){
          case 1 : colorCode = '#b71c1c';
            break;
          case 2 : colorCode = '#e65100';
            break;
          case 3 : colorCode = '#4a148c';
            break;
          default : colorCode = '#1b5e20';
          break;
        }
    }
  return colorCode;
}