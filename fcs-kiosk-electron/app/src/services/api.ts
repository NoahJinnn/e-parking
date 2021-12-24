import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/json',
  },
})

const handleGenericError = (error: object) => {
  // TODO: Log error
}

export default {
  get: (url: string, config?: object) => {
    return instance({
      url,
      method: 'get',
      ...config,
    })
      .then((response) => response)
      .catch((error) => {
        handleGenericError(error)
        throw error
      })
  },

  post: (url: string, data?: object, config?: object) =>
    instance({
      url,
      method: 'post',
      data,
      ...config,
    })
      .then((response) => response)
      .catch((error) => {
        handleGenericError(error)
        throw error
      }),
  put: (url: string, data?: object, config?: object) =>
    instance({
      url,
      method: 'put',
      data,
      ...config,
    })
      .then((response) => response)
      .catch((error) => {
        handleGenericError(error)
        throw error
      }),

  patch: (url: string, data?: object, config?: object) =>
    instance({
      url,
      method: 'patch',
      data,
      ...config,
    })
      .then((response) => response)
      .catch((error) => {
        handleGenericError(error)
        throw error
      }),

  delete: (url: string, config?: object) =>
    instance({
      url,
      method: 'delete',
      ...config,
    })
      .then((response) => response)
      .catch((error) => {
        handleGenericError(error)
        throw error
      }),
}
