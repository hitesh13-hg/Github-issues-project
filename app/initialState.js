/**
 * Created by vivek on 22/5/17.
 */
import { loadItem } from './services/localStorageApi';

// const isLoggedIn = loadItem('isLoggedIn') || false;

export default {
  cap: {
    loadingUser: true,
    token: loadItem('token') || '',
    orgID: loadItem('orgID') || '',
    // user: loadItem('user') || '',
    messages: [],
    metaEntities: {
      tags: [],
      layouts: [],
    },
    // isLoggedIn,
  },
  app: {

  },
  create: {

  },
  edit: {

  },
  templates: {

  },
  email: {

  },
  ebill: {

  },
};
