import { NotificationsActive, NotificationsActiveOutlined, SecurityOutlined, WarningAmber } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import React from 'react';

function GlobalNotifier({
  notifierState, setNotifierState, setAnchorElNotification,
}) {
  const handleClose = (e) => {
    e.preventDefault();
    setNotifierState((currentProps) => {
      return { ...currentProps, open: false };
    });
  };

  const handleMenu = (e) => {
    setNotifierState((currentProps) => {
      return { ...currentProps, open: false };
    });
    setAnchorElNotification({ ...e.currentTarget, top: '16px', left: '708px' });
  };

  const action = (
    <>
      <Button
        variant="text"
        onClick={handleMenu}
        style={{ color: 'white', textTransform: 'none' }}
      >
        Go
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        style={{ backgroundColor: '#cfd8dc', color: 'black', textTransform: 'none' }}
      >
        Ignore
      </Button>
      
    </>
  );
  return (
    
    <Dialog 
      open={notifierState.open}
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { 
        minWidth: '250px', width: '60%', 
        maxWidth: '400px', maxHeight: '100%', 
        backgroundColor:  notifierState.color, 
        // background: `radial-gradient(circle, rgba(255,255,255,1) 5%, ${notifierState.color} 100%)`,
        // bbackground: 'rgb(255,58,0)',
        // background: 'linear-gradient(120deg, rgba(255,58,0,1) 0%, rgba(245,88,0,0.9538690476190477) 51%, rgba(252,144,69,0.9734768907563025) 100%)',
        borderRadius: 5} 
      }}
      PaperProps={{ sx: { position: "fixed", top: 50 } }}
    >
      <DialogTitle style={{textAlign: 'center'}}>
        <span style={{fontSize: '30px', fontWeight: 'bold', color: 'white'}}>
          {notifierState.message} !
        </span>
      </DialogTitle>
      <DialogContent style={{textAlign: 'center'}}>
        {/* <SecurityOutlined style={{fontSize: 80, backgroundColor: 'white', borderRadius: 5, color: notifierState.color}}/> */}
        <NotificationsActiveOutlined style={{fontSize: 80, backgroundColor: 'white', borderRadius: 5, color: notifierState.color}} />
        {/* <WarningAmber style={{fontSize: 80}}/> */}
      </DialogContent>
      <DialogActions style={{alignSelf: 'center'}}>
        <div style={{display: 'grid'}}>
          <Button
            variant="contained"
            onClick={handleMenu}
            style={{ backgroundColor: '#cfd8dc', 
              color: notifierState.color, 
              textTransform: 'none', 
              width: 300,
              borderRadius: 15,
            }}
            >
            Take a look
          </Button>
          <Button
            onClick={handleClose}
            variant="test"
            style={{ color: 'white', textTransform: 'none', width: 300, opacity: 0.7 }}
          >
            May be later
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default GlobalNotifier;
