import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils
} from "admin-on-rest";
import { stringify } from "query-string";
import { API_URL, API_VER } from './env';


/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
  let url = `${API_URL}${API_VER}`;
  const options = {
      user: {
          authenticated: true,
          token: `Bearer ${localStorage.getItem('token')}`
      }
  };
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        perPage,
        page,
        filter: JSON.stringify(params.filter)
      };
      url = `${url}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_ONE:
      url = `${url}/${resource}/${params.id}`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids })
      };
      url = `${url}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id })
      };
      url = `${url}/${resource}?${stringify(query)}`;
      break;
    }
    case UPDATE:
      url = `${url}/${resource}/${params.id}`;
      options.method = "PUT";
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${url}/${resource}`;
      options.method = "POST";
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${url}/${resource}/${params.id}`;
      options.method = "DELETE";
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
  return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
  const { headers, json } = response;
  console.log(type, json);
  switch (type) {
    case GET_LIST:
        return {
            data: json.data.map(x => x),
            total: json.total
        };
    case GET_MANY:
        return {
            data: json.data.map(x => x),
            total: json.total
        };
    case GET_MANY_REFERENCE:
        return {
            data: json.data.map(x => x),
        };
    case CREATE:
        return { data: { ...params.data, id: json.id } };
    default:
        return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertRESTRequestToHTTP(type, resource, params);
  return fetchJson(url, options).then(response =>
    convertHTTPResponseToREST(response, type, resource, params)
  );
};
