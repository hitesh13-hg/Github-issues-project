/**
 * Created by vivek on 22/5/17.
 */
import { fromJS } from 'immutable';
import _ from 'lodash';
import * as types from './constants';
import initialState from '../../initialState';

function capReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state.set('login_progress', true);
    case types.LOGIN_SUCCESS:
      return state
        .set('login_progress', false)
        .set('token', action.res.token)
        .set('user', fromJS(action.res.user))
        .set('message', '')
        .set('authenticated', true)
        .set('isLoggedIn', true);
    case types.LOGIN_FAILURE:
      return state
        .set('login_progress', false)
        .set('message', action.error.message);
    case types.LOGOUT_REQUEST:
      return state.set('login_progress', false);
    case types.LOGOUT_SUCCESS:
      return state;
    case types.LOGOUT_FAILURE:
      return state;
    case types.SWITCH_ORG_REQUEST:
      return state
        .set('settingProxyOrg', true)
        .set('changeProxyOrgSuccess', false);
    case types.SWITCH_ORG_SUCCESS:
      return state
        .set('orgID', action.orgID)
        .set('settingProxyOrg', false)
        .set('changeProxyOrgSuccess', action.isSuccess);
    case types.SWITCH_ORG_FAILURE:
      return state
        .set('settingProxyOrg', false)
        .set('changeProxyOrgSuccess', false);
    case types.ADD_MESSAGE: {
      const message = {
        messageId: action.message.id,
        title: action.message.title,
        text: action.message.text,
        type: action.message.type,
        hideProgressBar: action.message.hideProgressBar,
      };
      return state
        .set('messages', fromJS(state.get('messages').concat(message)));
    }
    case types.REMOVE_MESSAGE: {
      const messageQueue = state.get('messages').toJS();
      const messageIndex = _.findIndex(messageQueue, { messageId: action.messageIndex });
      messageQueue.splice(messageIndex, 1);
      return state
        .set('messages', fromJS(messageQueue));
    }
    case types.GET_USER_DATA_REQUEST:
      return state
        .set('fetching_userdata', true)
        .set('isLoggedIn', false);
    case types.GET_USER_DATA_SUCCESS:
      return state
        .set('fetching_userdata', false)
        .set('user', fromJS(action.userData))
        .set('currentOrgDetails', fromJS(action.currentOrgDetails))
        .set('isLoggedIn', true)
        .set('orgID', action.currentOrgId);
    case types.GET_USER_DATA_FAILURE:
      return state
        .set('fetching_userdata', false)
        .set('isLoggedIn', false);
    case types.GET_SCHEMA_FOR_ENTITY_REQUEST:
      return state
        .set('fetchingSchema', true);
    case types.GET_SCHEMA_FOR_ENTITY_FAILURE:
      return state
        .set('fetchingSchema', false);
    case types.GET_SCHEMA_FOR_ENTITY_SUCCESS: {
      const stateMeta = state.get('metaEntities');
      console.log('stateMeta', stateMeta);
      return state
        .set('fetchingSchema', false)
        .set('metaEntities', {
          layouts: action.data && action.entityType === 'LAYOUT' ? action.data.metaEntities : stateMeta.layouts,
          tags: action.data && action.entityType === 'TAG' ? action.data.metaEntities : stateMeta.tags,
        });
    }
    case types.CLEAR_META_ENTITIES:
      return state.set('metaEntities', {
        layouts: [],
        tags: [],
      });
    case types.HIDE_TAGS:
      const metaEntities = {tags: {}, layouts: state.get('metaEntities').layouts};
      metaEntities.tags.standard = _.filter(state.get('metaEntities').tags.standard, (tag) => action.tagList.indexOf(tag.definition.value) === -1);
      metaEntities.tags.custom = _.filter(state.get('metaEntities').tags.custom, (tag) => action.tagList.indexOf(tag.name) === -1);
      return state.setIn(['metaEntities'], metaEntities);
    default:
      return state;
  }
}

export default capReducer;
