const baseURL = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
    const URL = `${baseURL}/${endpoint}`;

    if (method === 'GET') {
        return fetch(URL);
    } else {
        return fetch(URL, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchWithToken = (endpoint, data, method = 'GET') => {
    const URL = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(URL, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(URL, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}

export {
    fetchWithToken,
    fetchWithoutToken
}