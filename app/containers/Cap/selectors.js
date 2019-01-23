import { createSelector } from 'reselect';
import  initialState  from '../../initialState';
import { fromJS } from 'immutable';

/**
 * Direct selector to the cap state domain
 */

const selectCapDomain = state => {
  return state.get('cap', fromJS(initialState));
}

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cap
 */

const makeSelectCap = () =>
  createSelector(selectCapDomain, substate => substate.toJS());



export {
  selectCapDomain,
  makeSelectCap,
};
