import { Box, Chip, Dialog, DialogTitle, Grid, LinearProgress } from '@mui/material'
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
          </DialogTitle>
          <Grid container spacing={1} sx={{ p: 3}}>
            <Box style={{
              width: '100%'
            }}>
              <div style={{
                float: 'right',
                fontWeight: 'bold'
              }}>
                Device Status : 
                <Chip
                  variant="outlined"
                  label="Connected"
                  style={{
                    color: 'green',
                    borderColor: 'green',
                  }}
                />
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