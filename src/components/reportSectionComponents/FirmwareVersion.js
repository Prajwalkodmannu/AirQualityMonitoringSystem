import React, { useState } from 'react'
import { FormControl, Select, Button, Stack, InputLabel, MenuItem, Box, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';

const columns = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'deviceName', headerName: 'Device Name', width: 130 },
    { field: 'FirmwareVersion', headerName: 'FirmwareVersion', width: 130 },
    { field: 'HardwareVersion', headerName: 'HardwareVersion', width: 130 },

];

const rows = [
];

const ApplicationVersion = (props) => {
    const [deviceId, setDeviceId] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };

    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center">
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                        DownloadCsv();
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                </Fab>
                <Button
                    variant="contained"
                    onClick={() => {
                        SendEmail();
                    }}
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
                <Box sx={{ minWidth: 230 }}>
                    <FormControl fullWidth>
                        <InputLabel>Device</InputLabel>
                        <Select
                            value={deviceId}
                            label="Age"
                            onChange={(e) => {
                                HandleDeviceChange(e.target.value);
                            }}
                        >
                            {props.deviceList.map((data) => (
                                <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus type="submit">
                        Submit
                    </Button>
                </FormControl>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus >
                        Cancel
                    </Button>
                </FormControl>
            </Stack>
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
    )
}

export default ApplicationVersion