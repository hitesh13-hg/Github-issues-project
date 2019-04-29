/**
 * Created by Meharaj.
 */
import * as types from './constants';

export function authenticate(user) {
  return {
    type: types.LOGIN_REQUEST,
    user,
  };
}

export function logout() {
  return {
    type: types.LOGOUT_REQUEST,
  };
}

export function changeOrg(orgID, successCallback) {
  return {
    type: types.SWITCH_ORG_REQUEST,
    orgID,
    successCallback,
  };
}

export function addMessageToQueue(message) {
  return {
    type: types.ADD_MESSAGE,
    message,
  };
}

export function removeMessageFromQueue(messageIndex) {
  return {
    type: types.REMOVE_MESSAGE,
    messageIndex,
  };
}

export function getUserData() {
  return {
    type: types.GET_USER_DATA_REQUEST,
  };
}

export function getMenuData(code) {
  return {
    type: types.GET_MENU_DATA_REQUEST,
    code,
  };
}

export function getMenuDataSuccess(data) {
  return {
    type: types.GET_MENU_DATA_SUCCESS,
    data,
  };
}

export function getMenuDataFailure(error) {
  return {
    type: types.GET_MENU_DATA_FAILURE,
    error,
  };
}

export function getCampaignDetailsById(id) {
  return {
    type: types.GET_CAMPAIGN_DETAILS_BY_ID_REQUEST,
    id,
  };
}

export const getRemainingSMSCredits = () => ({
  type: types.GET_SMS_REMAINING_CREDITS_REQUEST,
});
