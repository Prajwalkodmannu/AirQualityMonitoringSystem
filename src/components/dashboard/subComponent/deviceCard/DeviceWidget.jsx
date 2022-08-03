import './deviceWidget.scss';
import {
  NotificationsActiveOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { Badge, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDeviceBackgroundColor, getDeviceHeaderColor, getDeviceModeColor } from '../../../../utils/helperFunctions';

function DeviceWidget({
  data, setLocationDetails, setBreadCrumbLabels, setIsDashBoard, deviceIdList
}) {
  const [modeColor, setModeColor] = useState('primary');
  const [alertStatus, setAlertStatus] = useState(4);

  useEffect(() => {
    if (data) {
      setModeColor(getDeviceBackgroundColor(data.deviceMode, alertStatus, parseInt(data.disconnectedStatus)));
    }
    let element = {
      alertLabel: 'Good',
      alertColor: 'green',
      alertPriority: 4,
    };

    const alertObject = deviceIdList?.filter((alert) => {
      return data.id === parseInt(alert.id);
    });

    alertObject?.map((data) => {
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
      element = element.alertPriority < data.alertPriority ? element
        : {
          alertLabel: data.alertType === 'Critical' ? 'Critical' : data.alertType === 'outOfRange' ? 'Out Of Range' : 'Good',
          alertColor: data.alertType === 'Critical' ? 'red' : data.alertType === 'outOfRange' ? 'orange' : 'green',
          alertPriority: data.alertType === 'Critical' ? 1 : data.alertType === 'outOfRange' ? 2 : 3,
        };
    });

  }, []);

  const handleClick = () => {
    setLocationDetails((oldValue) => {
      return { ...oldValue, device_id: data.id };
    });
    setBreadCrumbLabels((oldvalue) => {
      return { ...oldvalue, deviceLabel: data.deviceName };
    });
    setIsDashBoard(1);
  };

  return (
    <div
      className="widget"
      onClick={() => {
        data.deviceMode === 'disabled' ? '' : handleClick(data);
      }}
      style={{
        height: '190px', cursor: data.deviceMode === 'disabled' ? 'not-allowed' :'pointer', display: 'block', padding: 1,
      }}
    >
      <div
        className="left"
        style={{
          backgroundColor: getDeviceBackgroundColor(data.deviceMode, alertStatus, parseInt(data.disconnectedStatus)),
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
          alignContent: 'space-between',
        }}
      >
        <div style={{
          display: 'flex',
          alignContent: 'center',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <div>
            <span
              className="title"
              style={{
                float: 'left',
                marginTop: 5,
                marginLeft: 5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '120px',
                color: getDeviceHeaderColor(data.deviceMode, alertStatus, parseInt(data.disconnectedStatus)),
              }}
            >
              {data.deviceName}
            </span>
          </div>
          <div>
            <span
              className="counter"
              style={{
                float: 'right',
                marginRight: 5,
                fontWeight: 500,
                color: getDeviceHeaderColor(data.deviceMode, alertStatus, parseInt(data.disconnectedStatus)),
              }}
            >
              {data.deviceCategory}
            </span>
          </div>
        </div>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div
          className="percentage"
          style={{
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <div style={{
            height: data.deviceMode === 'disabled' ? '100%' : '70%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            {data.deviceMode === 'disabled'
              ? (
                <div style={{
                  height: '100%', width: '100%', overflow: 'auto', display: 'flex', alignItems: 'center',
                }}
                >
                  <div style={{ width: '100%', alignContent: 'center', color: 'black' }}>
                      <WifiOffOutlined style={{ fontSize: '70px', color: '#707070' }} />
                  </div>
                </div>
              )
              : (
                <div style={{
                  width: '100%', height: '100%', overflow: 'auto', display: 'flex', alignItems: 'center',
                }}
                >
                  <div style={{ width: '60%', textAlignLast: 'center', paddingLeft: 10 }}>
                    Active Alarms :
                  </div>
                  <div style={{
                    width: '40%', alignContent: 'center', color: 'black', marginTop: 5,
                  }}
                  >
                    <Badge
                      badgeContent={data.deviceMode === 'disabled' ? '' : data.alertDataCount}
                      style={{
                        // color: data.deviceMode === 'disabled' ? '#757575' : '#f44336',
                        color: 'green',
                      }}
                      color={data.alertDataCount === '0' ? 'success' : 'error'}
                      max={999}
                    >
                      <NotificationsActiveOutlined
                        style={{ fontSize: '40px' }}
                        sx={{
                          color: '#ffa000'
                        }}
                      />
                    </Badge>
                  </div>
                </div>
              )}
          </div>
          {data.deviceMode === 'disabled' ? ''
            : (
              <div style={{
                height: '30%',
                width: '100%',
                display: 'flex',
                overflow: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: 15,
              }}
              >
                <div style={{
                  textAlignLast: 'left', textAlign: 'justify', paddingLeft: 10, marginRight: 5,
                }}
                >
                  Device Mode :
                </div>
                <div style={{
                  alignContent: 'center', color: 'black', textAlignLast: 'right',
                }}
                >
                  <Chip
                    label={data.deviceMode}
                    variant="outlined"
                    sx={{
                      color: getDeviceModeColor(data.deviceMode),
                      borderColor: getDeviceModeColor(data.deviceMode),
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

    </div>
  );
}

export default DeviceWidget;
