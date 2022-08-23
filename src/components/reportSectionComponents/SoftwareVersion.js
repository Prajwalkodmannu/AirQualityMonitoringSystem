import React from 'react'
import { FormControl, Select, Button, Stack, InputLabel, MenuItem, Box, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';

const columns = [
    { field: 'id', headerName: 'Date', width: 70 },
    { field: 'firstName', headerName: 'Time', width: 130 },
    { field: 'lastName', headerName: 'Software Version', width: 130 },
    {
        field: 'Summary',
        headerName: 'Summary',
        type: 'number',
        width: 90,
    },
];

const SoftwareVersion = () => {
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
                    // rows={ }
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
    )
}

export default SoftwareVersion