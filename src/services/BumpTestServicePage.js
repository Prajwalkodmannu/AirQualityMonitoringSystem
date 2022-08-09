const successCaseCode = [200, 201];

const _fetchServiceBumpTestData = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
<<<<<<< HEAD
  const END_POINT = 'https://varmatrix.com/Aqms/';
  const body = { body: JSON.stringify(data) };

  const bodyParameters = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    ...body,
=======
    const END_POINT = 'https://68.178.163.133/aideaLabs/';
    const body = { body: JSON.stringify(data) };
  
    const bodyParameters = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      ...body,
    };
  
    const bodyObject = {
      method: serviceMethod,
      ...bodyParameters,
    };
  
    return fetch(END_POINT + PATH, bodyObject)
      .then((response) => {
        if (successCaseCode.indexOf(response.status) > -1) {
          return response.json();
        }
        // eslint-disable-next-line no-throw-literal
        throw {
          errorStatus: response.status,
          errorObject: response.json(),
        };
      })
      .then((dataResponse) => successCallback(dataResponse))
      .catch((error) => {
        error.errorObject.then((errorResponse) => {
          const errorMessage = errorResponse.error ? errorResponse.error : errorResponse.message;
          errorCallBack(error.errorStatus, errorMessage);
        });
      });
>>>>>>> 75ee1f9df2be3ee7f7e5abafefe824654ec01fa0
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (successCaseCode.indexOf(response.status) > -1) {
        return response.json();
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        errorStatus: response.status,
        errorObject: response.json(),
      };
    })
    .then((dataResponse) => successCallback(dataResponse))
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        const errorMessage = errorResponse.error ? errorResponse.error : errorResponse.message;
        errorCallBack(error.errorStatus, errorMessage);
      });
    });
};

export const BumpTestData = (data, successCallback, errorCallBack) => _fetchServiceBumpTestData('AQMS_DATA_EXTRACTION_CRON/aqms_data_extraction.php', 'POST', data, successCallback, errorCallBack);
