import ApplicationStore from '../utils/localStorageUtil';

const successCaseCode = [200, 201];

const _fetchServiceDownloadCsvData = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
    const { user_token, userDetails } = ApplicationStore().getStorage('userDetails');
    const END_POINT = 'https://varmatrix.com/wAqms/api/';
    const { emailId, userRole, companyCode } = userDetails;

    const headers = {
        'Content-Type': 'blob',
        authorization: `Bearer ${user_token}`,
        companyCode: `${companyCode}`,
        userId: `${emailId}`,
        userRole: `${userRole}`,
        responseType: 'arraybuffer',
    };
    const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

    const bodyParameters = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers,
        ...body,
    };

    const bodyObject = {
        method: serviceMethod,
        ...bodyParameters,
    };

    var filename = "";

    return fetch(END_POINT + PATH, bodyObject)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            var contentDisposition = response.headers.get('Content-Disposition');
            filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
            // var filename = `${Date.now()}.xlsx`; //contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
            console.log(filename);
            return response.blob();
        })
        .then((dataResponse) => {
            successCallback(dataResponse);
            if (dataResponse != null) {
                var url = window.URL.createObjectURL(dataResponse);
                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                // a.remove();
            }
        })
        .catch((error) => {
            error.errorObject.then((errorResponse) => {
                if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
                    ApplicationStore().clearStorage();
                    location.reload();
                }
                errorCallBack(error.errorStatus, errorResponse.message);
            });
        });
};

export const DownloadReportBumpTestCsv = (data, successCallback, errorCallBack) => {
    const deviceId = data.device_id;
    const fromDate = data.fromDate;
    const toDate = data.toDate;


    return _fetchServiceDownloadCsvData(`exportBumpTestCsv?=&deviceId=${deviceId}&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
}








