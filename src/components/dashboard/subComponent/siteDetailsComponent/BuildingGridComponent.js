import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BuildingFetchService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType, setAQIColor } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
function BuildingGridComponent(props) {
  const {
    setImg, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
    setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList, siteImages, setSiteImages,
    setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList, locationAlerts
  } = props;
  const { buildingIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);
  const dataColumns = [
    {
      field: 'buildingName',
      headerName: 'Building Name',
      width: 200,
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
        const alertObject = buildingIdList?.filter((alert) => {
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
    {
      field: 'aqiIndex',
      headerName: 'AQI Index',
      width: 100,
      renderCell: ((params) => {
        return(
          <span
            style={{
              color: setAQIColor(params.row.aqiIndex)
            }}
          >
            {params.row.aqiIndex}
          </span>
        )
      }),
    }
  ];
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setGridLoading(true);
    BuildingFetchService({
      location_id: props.locationDetails.location_id,
      branch_id: props.locationDetails.branch_id,
      facility_id: props.locationDetails.facility_id,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.buildingName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(12);
  };

  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          locationAlerts({building_id: selectedRow.id});
          setLocationDetails((oldValue) => {
            return { ...oldValue, building_id: selectedRow.id };
          });
          setIsGeoMap(false);
          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, buildingLabel: selectedRow.buildingName };
          });

          setProgressState(4);
          setImg(selectedRow.buildingImg);
          setSiteImages((oldValue) => {
            return { ...oldValue, buildingImage: selectedRow.buildingImg };
          });
        }}
      >
        {selectedRow.buildingName}
      </h3>
    );
  }

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState((oldValue) => {
      let newValue = value;
      if (locationDetails.lab_id) {
        newValue = value < 7 ? 6 : value;
      } else if (locationDetails.floor_id) {
        newValue = value < 6 ? 5 : value;
      } else if (locationDetails.building_id) {
        newValue = value < 5 ? 4 : value;
      } else if (locationDetails.facility_id) {
        newValue = value < 4 ? 3 : value;
      } else if (locationDetails.branch_id) {
        newValue = value < 3 ? 2 : value;
      } else if (locationDetails.location_id) {
        newValue = value < 2 ? 1 : value;
      } else {
        // locationAlerts({});
      }
      return newValue;
    });
  };
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            let value = 0;
            if (locationDetails.lab_id) {
              locationAlerts({lab_id: locationDetails.lab_id || props.locationDetails.lab_id});
              value = 6;
            } else if (locationDetails.floor_id) {
              locationAlerts({floor_id: locationDetails.floor_id || props.locationDetails.floor_id});
              value = 5;
            } else if (locationDetails.building_id) {
              locationAlerts({building_id: locationDetails.building_id || props.locationDetails.building_id});
              value = 4;
            } else if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
              value = 3;
            } else if (locationDetails.branch_id) {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
              value = 2;
            }else if (locationDetails.location_id) {
              locationAlerts({location_id: locationDetails.location_id || props.locationDetails.location_id});
              value = 1;
            } else {
              locationAlerts({});
              value = 0;
            }
            setLocationlabel(value);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            let value = 1;
            if (locationDetails.lab_id) {
              locationAlerts({lab_id: locationDetails.lab_id || props.locationDetails.lab_id});
              value = 6;
            } else if (locationDetails.floor_id) {
              locationAlerts({floor_id: locationDetails.floor_id || props.locationDetails.floor_id});
              value = 5;
            } else if (locationDetails.building_id) {
              locationAlerts({building_id: locationDetails.building_id || props.locationDetails.building_id});
              value = 4;
            } else if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
              value = 3;
            } else if (locationDetails.branch_id) {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
              value = 2;
            } else {
              locationAlerts({location_id: locationDetails.location_id || props.locationDetails.location_id});
              value = 1;
            }
            setLocationlabel(value);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            let value = 2;
            if (locationDetails.lab_id) {
              locationAlerts({lab_id: locationDetails.lab_id || props.locationDetails.lab_id});
              value = 6;
            } else if (locationDetails.floor_id) {
              locationAlerts({floor_id: locationDetails.floor_id || props.locationDetails.floor_id});
              value = 5;
            } else if (locationDetails.building_id) {
              locationAlerts({building_id: locationDetails.building_id || props.locationDetails.building_id});
              value = 4;
            } else if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
              value = 3;
            } else {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
              value = 2;
            }
            setLocationlabel(value);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.branchLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.facilityLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={dataColumns}
        loading={isLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default BuildingGridComponent;
