import { Check, Close } from '@mui/icons-material';
import {
  Button, CircularProgress, Dialog, DialogContent, DialogTitle, Fab,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { ChangeDeviceMode } from '../../../services/LoginPageService';

function DebugModeModal({
  open, setOpen, setRefreshData, device_id,
}) {
  const [deviceStatus, setDeviceStatus] = useState(true);
  const [deviceCode, setDeviceCode] = useState(false);
  const buttonSx = {
    ...({
      bgcolor: deviceCode ? red[500] : green[500],
      '&:hover': {
        bgcolor: deviceCode ? red[700] : green[700],
      },
    }),
  };

  useEffect(() => {
    setInterval(() => {
      setDeviceStatus((oldValue) => !oldValue);
    }, 5000);
    setInterval(() => {
      setDeviceCode((oldValue) => !oldValue);
    }, 3000);
  }, []);
  const onCancel = () => {
    ChangeDeviceMode({ id: device_id, deviceMode: 'enabled' }, modeHandleSuccess, modeChangeHandleException);
  };

  const modeHandleSuccess = () => {
    setRefreshData((oldvalue) => !oldvalue);
    setOpen(false);
  };

  const modeChangeHandleException = () => { };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '100%' } }}
      open={open}
    >
      <DialogTitle>
        Debugging...
      </DialogTitle>
      <DialogContent>
        <div>
          Device status : &nbsp;
          {!deviceStatus
            ? (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                }}
              />
            )
            : (
              <Fab
                aria-label="save"
                color={deviceCode ? 'primary' : 'secondary'}
                sx={buttonSx}
                style={{
                  height: 25,
                  width: 25,
                  minHeight: 25,
                }}
              >
                {deviceCode
                  ? <Close fontSize="24px" />
                  : <Check fontSize="24px" />}
              </Fab>
            )}

        </div>
        <div className="float-right">
          <div className="rounded-md -space-y-px">
            <Button
              sx={{ m: 2 }}
              onClick={onCancel}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DebugModeModal;
