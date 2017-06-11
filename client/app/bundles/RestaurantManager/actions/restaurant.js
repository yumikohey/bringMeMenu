import axios from 'axios';
import { GET_RESTAURANT_PROFILE, LOAD_RESTAURANT_PROFILE_SUCCESS, LOAD_RESTAURANT_PROFILE_FAILURE,
		 GET_SLUG_REQUEST, GET_SLUG_SUCCESS } from '../constants/profileConstants';
import { NEW_ORDER_IN, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
		 UPDATE_ORDER_REQUEST } from '../constants/kitchenConstants';


export function restaurantUpdateProfileRequest(url, enterpriseData, csrfToken) {
	return dispatch => {
		let instance = axios.create({
			headers: {'X-CSRF-Token': csrfToken },
		});
		return instance.put(url, enterpriseData);
	}
};

export function getRestaurantSlugRequest() {
	const request = axios({
		method: 'get',
		url: '/v1/get_slug'
	});

	return {
		type: GET_SLUG_REQUEST,
		payload: request
	}
}

export function getRestaurantProfileRequest(url) {
	const request = axios({
		method: 'get',
		url
	});

	return {
		type: GET_RESTAURANT_PROFILE,
		payload: request
	}
}

export function loadRestaurantProfileSuccess(data) {
	return {
		type: LOAD_RESTAURANT_PROFILE_SUCCESS,
		data
	}
}

export function loadRestaurantProfileFailure(err) {
	return {
		type: LOAD_RESTAURANT_PROFILE_FAILURE,
		err
	}
}

export function getRestaurantSlugSuccess(slug) {
	return {
		type: GET_SLUG_SUCCESS,
		slug
	}
}

export function newOrderIn(data) {
	return {
		type: NEW_ORDER_IN,
		data
	} 
}

export function getRestaurantOrders() {
	const request = axios({
		method: 'get',
		url: '/v1/get_orders'
	});

	return {
		type: GET_ORDERS_REQUEST,
		payload: request
	}
}

export function getRestaurantOrdersSuccess(data) {
	return {
		type: GET_ORDERS_SUCCESS,
		data
	}
}

export function getRestaurantOrdersFailure(err) {
	return {
		type: GET_ORDERS_FAILURE,
		err
	}
}

export function updateOrderStatus(data, csrfToken) {
	const request = axios({
	  method: 'put',
	  url: '/v1/update_order',
	  headers: {
	    'X-CSRF-Token': csrfToken
	  },
	  data
	});
    return {
      type: UPDATE_ORDER_REQUEST,
  	  payload: request
    }
}