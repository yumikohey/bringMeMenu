import axios from 'axios';
import { GET_MENU_REQUEST, ADD_ITEM_TO_MENU_REQUEST, ADD_ITEM_TO_MENU_SUCCESS, GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../constants/menuConstants';
import { UPDATE_ITEM, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE } from '../constants/itemConstants';

export function addItemToMenuRequest(menuData, csrfToken) {	
	const request = axios({
	  method: 'post',
	  url: '/v1/add_item',
	  headers: {
	    'X-CSRF-Token': csrfToken
	  },
	  data: menuData
	});
    return {
      type: ADD_ITEM_TO_MENU_REQUEST,
  	  payload: request
    }
}

export function addItemToMenuSuccess(data) {
	return {
	  type: ADD_ITEM_TO_MENU_SUCCESS,
	  data
	};
}

export function getMenuRequest(url) {	
	const request = axios({
	  method: 'get',
	  url
	});
	return {
	  type: GET_MENU_REQUEST,
	  payload: request
	};
}

export function getMenuRequestSuccess(data) {
	return {
		type: GET_MENU_SUCCESS,
		data
	}
}

export function getMenuRequestFailure(error) {
	return {
		type: GET_MENU_FAILURE,
		error
	}
}

export function updateItemRequest(itemData, csrfToken) {
	const request = axios({
	  method: 'put',
	  url: '/v1/update_item',
	  headers: {
	    'X-CSRF-Token': csrfToken
	  },
	  data: itemData
	});
    return {
      type: UPDATE_ITEM,
  	  payload: request
    }
}

export function updateItemSuccess(data) {
	return {
		type: UPDATE_ITEM_SUCCESS,
		data
	}
}

export function updateItemFailure(error) {
	return {
		type: UPDATE_ITEM_FAILURE,
		error
	}
}