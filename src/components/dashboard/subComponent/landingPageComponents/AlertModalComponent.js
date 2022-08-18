import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AlertWidget from '../../components/AlertWidget';
import { DeviceIdAlerts } from '../../../../services/LoginPageService';

function AlertModalComponent({alertOpen, setAlertOpen, locationDetails}) {
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    DeviceIdAlerts(locationDetails, fetchAlertListSuccess, fetchAlertListException);
  },[locationDetails,refreshData]);

  const fetchAlertListSuccess = (dataObject) => {  
    setDataList(dataObject.data);
  }

  const fetchAlertListException = () => {
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '95%', height:'90vh' } }}
      maxWidth="lg"
      open={alertOpen}
    >
      <DialogTitle style={{
        paddingBottom: '0px'
      }}>
        Active alerts
      </DialogTitle>
      <DialogContent style={{
        paddingTop: '0px'
      }}>       
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
          xl={12}
          sx={{
            padding: 1,
            marginLeft: 1,
          }}          
        >
          <DialogContent style={{
            height : '435px',
            paddingTop: '0px'
          }}>
              <div style={{
                height: 390,
                width: '100%',
                margin: '0px',
                '& .super-app.Pass': {
                  backgroundColor: '#d47483',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
                paddingTop: '0px'
              }}
              >
                <AlertWidget dataList={dataList} setRefreshData={setRefreshData} maxHeight='500px'/>
              </div>
          </DialogContent>  
            <div className='float-right'>
            <Button
              sx={{ m: 1 }}
              size="large"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>           
        </Grid>    
                   
      </DialogContent>
    </Dialog>
  );
}

export default AlertModalComponent;
