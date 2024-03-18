import axios from '../axios';

export function getDataTest(token: any) {
    return axios.get('data', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}