import axios from 'axios';

export default function enterpriseSignupRequest(url, enterpriseData) {
	return dispatch => {
		let instance = axios.create({
			headers: {'X-CSRF-Token': enterpriseData.csrfToken },
		});
		return instance.post(url, enterpriseData);
	}
}