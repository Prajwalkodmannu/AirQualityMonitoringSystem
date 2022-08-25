import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchBranchService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */

function BranchGridComponent(props) {
  const {
    setLocationDetails, setProgressState, breadCrumbLabels,
    setBreadCrumbLabels, setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
    setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList, 
    locationAlerts
  } = props;
  const [dataList, setDataList] = useState([]);
  const { branchIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);
  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      width: 400,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'id',
      headerName: 'Status',
      width: 170,
      renderCell: ((params) => {
        let element = {
          alertLabel: 'Good',
          alertColor: 'green',
          alertPriority: 4,
        };
        const alertObject = branchIdList?.filter((alert) => {
          return params.row.id === parseInt(alert.id);
        });

        alertObject?.map((data) => {
          element = setAlertPriorityAndType(element, data);
        });

        return (
          <Chip
            variant="outlined"
            label={element.alertLabel}
            style={{
              color: element.alertColor,
              borderColor: element.alertColor,
            }}
          />
        );
      }),
    },
  ];
  useEffect(() => {
    setGridLoading(true);
    FetchBranchService({
      location_id: props.locationDetails.location_id,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    setProgressState(1);
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
    setLocationCoordinationList(newArray);
    setZoomLevel(6);
  };

  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          locationAlerts({branch_id: selectedRow.id});
          setLocationDetails((oldValue) => {
            return { ...oldValue, branch_id: selectedRow.id };
          });
          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, branchLabel: selectedRow.branchName };
          });
          setProgressState(2);
          const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
          setCenterLatitude(parseFloat(coordList[0]));
          setCenterLongitude(parseFloat(coordList[1]));
        }}
      >
        {selectedRow.branchName}
      </h3>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          style={{ cursor: 'pointer' }}
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            setProgressState((oldValue) => {
              let newValue = 0;
              if (locationDetails.facility_id) {
                newValue = 3;
                locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
              } else if (locationDetails.branch_id) {
                newValue = 2;
                locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
              } else if (locationDetails.location_id) {
                newValue = 1;
                locationAlerts({location_id: locationDetails.location_id || props.locationDetails.location_id});
              } else {
                locationAlerts({});
              }
              return newValue;
            });
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
        >
          Location
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.stateLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={branchColumns}
        loading={isLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default BranchGridComponent;
