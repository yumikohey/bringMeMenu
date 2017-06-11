import axios from 'axios';
import { GET_QRCODES_REQUEST, GET_QRCODES_SUCCESS, GET_QRCODES_FAILURE, ADD_QRCODE_REQUEST, ADD_QRCODE_SUCCESS, ADD_QRCODE_FAILURE } from '../constants/qrConstants';

export function addQRCodeRequest(qrInfo, csrfToken) {	
	const request = axios({
	  method: 'post',
	  url: '/v1/add_qr_code',
	  headers: {
	    'X-CSRF-Token': csrfToken
	  },
	  data: qrInfo
	});
    return {
      type: ADD_QRCODE_REQUEST,
  	  payload: request
    }
}

export function addQRCodeSuccess(data) {
	return {
		type: GET_QRCODES_SUCCESS,
		data
	}
}

export function addQRCodeFailure(error) {
	return {
		type: GET_QRCODES_FAILURE,
		error
	}
}

export function getQRCodesRequest() {	
	const request = axios({
	  method: 'get',
	  url: '/v1/qr_codes'
	});
    return {
      type: GET_QRCODES_REQUEST,
  	  payload: request
    }
}

export function getQRCodesSuccess(data) {
	return {
		type: GET_QRCODES_SUCCESS,
		data
	}
}

export function getQRCodesFailure(error) {
	return {
		type: GET_QRCODES_FAILURE,
		error
	}
}
