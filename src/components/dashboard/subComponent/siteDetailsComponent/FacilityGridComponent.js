import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchFacilitiyService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */

function FacilityGridComponent({
  locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
  setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
  setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList
}) {
  const { facilityIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);
  const facilityColumns = [
    {
      field: 'facilityName',
      headerName: 'Facility Name',
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
        const alertObject = facilityIdList?.filter((alert) => {
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

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setGridLoading(true);
    FetchFacilitiyService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    setAlertList(dataObject.data || []);   // Alert list
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(9);
  };

  const handleException = () => { };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setLocationDetails((oldValue) => {
            return { ...oldValue, facility_id: selectedRow.id };
          });

          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, facilityLabel: selectedRow.facilityName };
          });

          setProgressState(3);
          const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
          setCenterLatitude(parseFloat(coordList[0]));
          setCenterLongitude(parseFloat(coordList[1]));
        }}
      >
        {selectedRow.facilityName}
      </h3>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            setProgressState(() => {
              let newValue = 0;
              if (locationDetails.facility_id) {
                newValue = 3;
              } else if (locationDetails.branch_id) {
                newValue = 2;
              } else if (locationDetails.location_id) {
                newValue = 1;
              }
              return newValue;
            });
            // setProgressState(0);
            setDeviceCoordsList([]);
            // setCenterLatitude(23.500);
            // setCenterLongitude(80.000);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            setProgressState(() => {
              let newValue = 1;
              if (locationDetails.facility_id) {
                newValue = 3;
              } else if (locationDetails.branch_id) {
                newValue = 2;
              }
              return newValue;
            });
            // setProgressState(1);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.branchLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={facilityColumns}
        loading={isLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default FacilityGridComponent;
