import axios from 'axios';
import { GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAILURE, UPDATE_ORDER, PLACE_ORDER_REQUEST } from '../constants/orderMenuConstants';

export function getMenuRequest(url) {	
	const request = axios({
	  method: 'get',
	  url
	});
    return {
      type: GET_MENU_REQUEST,
  	  payload: request
    }
}

export function getMenuSuccess(restaurant_name, items) {
	return {
	  type: GET_MENU_SUCCESS,
	  restaurant_name,
	  items
	};
}

export function getMenuFailure(err) {
	return {
	  type: GET_MENU_FAILURE,
	  err
	};
}

export function updateOrder(item) {
	return {
		type: UPDATE_ORDER,
		item
	}
}

export function placeOrderRequest(data, csrfToken) {
	const request = axios({
		method: 'post',
		url: '/v1/place_order',
		headers: {
		  'X-CSRF-Token': csrfToken
		},
		data
	});
	return {
		type: PLACE_ORDER_REQUEST,
		payload: request
	}
}