/**
 * Created by vivek on 21/5/17.
 */
const config = {
  production: {
    api_endpoint: '/arya/api/v1/creatives',
    auth_endpoint: '/arya/api/v1/auth',
    login_url: '/login',
    dashboard_url: '/campaigns',
  },
  development: {
    api_endpoint: 'https://nightly.capillary.in/arya/api/v1/creatives',
    auth_endpoint: 'https://nightly.capillary.in/arya/api/v1/auth',
    login_url: '/login',
    dashboard_url: '/campaigns',
  },
  testing: {
    api_endpoint: '',
    auth_endpoint: '',
    login_url: '',
  },
};

export default config;
