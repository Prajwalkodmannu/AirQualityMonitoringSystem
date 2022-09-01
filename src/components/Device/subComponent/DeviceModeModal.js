import { Alert, Box, Chip, Dialog, DialogTitle, Grid, LinearProgress } from '@mui/material'
import React from 'react'

const DeviceModeModal = ({deviceModalOpen, setDeviceModalOpen, deviceModeHeader, deviceModeSubHeader}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '100%' } }}
      open={deviceModalOpen}
    >
        <Grid>
          <DialogTitle style={{padding: '0px', paddingLeft: '26px', paddingTop: '10px'}}>
            {deviceModeHeader}
              
            <div style={{
                float: 'right',
                paddingRight: '5px',
                fontSize: 'medium',
                fontWeight: 'normal',
                display: 'inline'
              }}>
                <div style={{
                  marginRight: 2,
                  display: 'inline'
                }}>
                  Device Status : 
                </div>
                <Chip
                  variant="outlined"
                  label="Connected"
                  style={{
                    color: 'green',
                    borderColor: 'green',
                  }}
                />
              </div>
          </DialogTitle>
          <Grid container spacing={1} sx={{ p: 3}}>
            <Box style={{
              textAlign: 'center',
              width: '100%'
            }}>
              <div style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <Alert 
                  // icon={false} 
                  severity="warning" style={{
                  textAlign: 'center',
                  width: '100%',
                }}>
                  
                  Do not turn off the device and make sure that you have a stable network
                </Alert>
              </div>
              
            </Box>
            <Grid style={{ 
                width: '100%', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 25
            }}>
                <div>
                    {deviceModeSubHeader}
                </div>
                <div style={{ width: '100%', marginTop: 1}}>
                    <div style={{ width: '100%', marginTop: 5 }}>
                        <LinearProgress />
                    </div>
                </div>
            </Grid>
          </Grid>
        </Grid>
    </Dialog>
  )
}

export default DeviceModeModal