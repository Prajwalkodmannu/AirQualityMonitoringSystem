import {
  Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
/* eslint-disable no-unused-vars */
function AppVersion() {
  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [data, setData] = useState([{
    version: 1,
    releaseDate: '10/08/2022',
    id: 0,
  }]);
  const [isLoading, setloading] = useState(false);
  const columns = [
    {
      field: 'version',
      headerName: 'Version',
      width: 110,
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      width: 170,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      // Add API
    } else {
      // Edit API
    }
  };

  return (
    <Grid>
      <Box
        sx={{
          mb: '10px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: 3,
        }}
      >
        <Typography variant="h5" sx={{ ml: 1 }}>
          Application Version
        </Typography>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Add sx={{ mr: 1 }} />
          Add version
        </Button>
      </Box>
      <div
        style={{
          margin: 5,
          minHeight: '300px',
          height: '300px',
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minWidth: '50%' } }}
        maxWidth="sm"
        open={open}
      >
        <DialogTitle>
          {isAddButton ? 'Add version' : 'Edit version'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                item
              >
                <TextField
                  fullWidth
                  sx={{ mt: 2 }}
                  label="Version Number"
                  type="number"
                  // value={phoneNo}
                  variant="outlined"
                  className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2
                                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                                focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                  required
                  // onChange={(e) => { setPhone(e.target.value); }}
                  autoComplete="off"
                />
              </Grid>
              <Grid
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                item
              >
                <TextField
                  fullWidth
                  label="Summary"
                  sx={{ mt: 2 }}
                  type="text"
                  multiline
                  rows={4}
                  placeholder="Version Summary"
                  required
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div className="rounded-md -space-y-px float-right">
              <Button
                type="submit"
              >
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default AppVersion;
