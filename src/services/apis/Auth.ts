import Api from './defaultapi'


class Auth extends Api {
  constructor(_axios: any) {
    super(_axios)
  }

  createAccount = (params: {}) => this.post('/auth/register', params)

  login = (params: {}) => this.post('/auth/login', params)

}

export default Auth