import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { BranchDeleteService, FetchBranchService } from '../../../services/LoginPageService';
import { BranchListToolbar } from './branch-list-toolbars';
import BranchModal from './BranchModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';

export function BranchListResults(props) {
  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalFacilities',
      headerName: 'Total Facilities',
      width: 170,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editData, setEditData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const routeStateObject = useLocation();
  const { location_id } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    FetchBranchService({
      location_id,
    }, handleSuccess, handleException);
  }, [refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];

      return {
        id: item.id,
        name: item.branchName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    props.setLocationCoordinationList(newArray);
  };
  /* eslint-disable-next-line */
  const handleException = (errorObject) => {
  };

  const deletehandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setDeleteDailogOpen(false);
    }, 3000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  /* eslint-disable-next-line */
  function LinkTo(props) {
    return (
      <Link
        to={`${props.selectedRow.branchName}`}
        state={{
          location_id,
          branch_id: props.selectedRow.id,
        }}
      >
        {props.selectedRow.branchName}
      </Link>
    );
  }
  /* eslint-disable-next-line */
  function EditData(props) {
    return (
      moduleAccess.edit
      && (
        <EditIcon
          onClick={() => {
            setIsAddButton(false);
            setEditData(props.selectedRow);
            setOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        />
      ));
  }
  /* eslint-disable-next-line */
  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        onClick={() => {
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
        }}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  const pathname = routeStateObject.pathname.split('/').filter((x) => x);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link underline="hover" color="inherit" to="/Location">
          Location
        </Link>
        <Typography
          underline="hover"
          color="inherit"
          to="/"
        >
          {pathname[1]}
        </Typography>
      </Breadcrumbs>
      <BranchListToolbar
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditData={setEditData}
        userAccess={moduleAccess}
      />
      <DataGrid
        rows={dataList}
        columns={branchColumns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
      <BranchModal
        isAddButton={isAddButton}
        editData={editData}
        open={open}
        setOpen={setOpen}
        locationId={location_id}
        setRefreshData={setRefreshData}
        locationCoordinationList={props.locationCoordinationList}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={BranchDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}
