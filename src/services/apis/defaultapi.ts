class Api {
  private axios: any;
  private prefix: string;

  constructor(_axios: any, _prefix = '') {
    this.axios = _axios
    this.prefix = _prefix
  }

  get(url: string, params = {}) {
    return this.axios
      .get(`${this.prefix}${url}`, {
        params,
      })
      .then((res: any) => res.data)
  }

  post(url: string, params = {}) {
    return this.axios.post(`${this.prefix}${url}`, params).then((res: any) => {
      return res.data
    })
  }

  put(url: string, params = {}) {
    return this.axios.put(`${this.prefix}${url}`, params).then((res: any) => res.data)
  }

  delete(url: string, params = {}) {
    return this.axios
      .delete(`${this.prefix}${url}`, {
        params,
      })
      .then((res: any) => res.data)
  }


}

export default Api
