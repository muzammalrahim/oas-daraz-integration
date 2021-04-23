import axios from 'axios'

export const ADMIN_ROUTE ='shopadmin'
export const API_URL = process.env.REACT_APP_BACKEND_URL+'api/v1/';
export const STATIC_URL = process.env.REACT_APP_BACKEND_URL+'static/media/uploads/';

const Authorization = JSON.parse(localStorage.getItem('persist:v705-demo1-auth'))?.authToken

export const headers = {
    'Content-type' : 'application/json',
    Authorization : `Token ${Authorization?.replaceAll('"','')}`
}

export function list(endpoint, params = {}){
    let config = {
        params : params
    }
    return axios.get(API_URL + endpoint)
}

export function put(endpoint, data){
    let config = {
        headers:headers
    }
    return axios.put(API_URL + endpoint, data, config)
}

export function patch(endpoint, data){
    let config = {
        headers:headers
    }
    return axios.patch(API_URL + endpoint, data, config)
}

export function post(endpoint, data){
    let config = {
        headers:headers
    }
    return axios.post(API_URL + endpoint + '/', data)
}

export function del(endpoint, data = {}){
    let config = {
        headers:headers,
        data: data
    }
    return axios.put(API_URL + endpoint, config)
}

export function destory(endpoint){
    let config = {
      headers:headers,
  }
  return axios.delete(API_URL + endpoint, config)
}

export const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
});

export const loadOptions = async (search, prevOptions, options, modelsLoaded) => {
    // lets sleep unless models data loaded
    await sleep(100);

    let filteredOptions;
    if (!search) {
        filteredOptions = options;
     } else {
        const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) =>
          label.toLowerCase().includes(searchLower)
        );
      }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 10
    );

    return {
      options: slicedOptions,
      hasMore
    };
};

export const DROPDOWN_WAIT = 500


export function getDateFormat(date){
  let timestamp = Date.parse(date);
    let data = new Date();
    if(isNaN(timestamp) == false)
      data = new Date(timestamp);
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(data);
    return `${year}-${month}-${day}`
}
