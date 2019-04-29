import { createSelector } from 'reselect';

/* parsing menu data in format required by topbar */
function getParsedMenuData(data) {
  const menuData = [];
  Object.entries(data).map(([key, value]) => {
    menuData.push({
      label: value.name,
      link: value.url,
      key,
      value: key,
    });
  });
  return menuData;
}

/**
 * Direct selector to the cap state domain
 */

const selectCap = state => state.get('cap');

/**
 * Other specific selectors
 */

const makeSelectCap = () =>
  createSelector(selectCap, substate => substate.toJS());

const makeSelectOrgDetails = () =>
  createSelector(selectCap, substate =>
    substate.get('currentOrgDetails').toJS(),
  );

const makeSelectLogin = () =>
  createSelector(selectCap, substate => substate.toJS());

const makeSelectUser = () =>
  createSelector(selectCap, substate => !!substate.toJS().token);

const isUserLoggedIn = () =>
  createSelector(selectCap, substate => substate.toJS().isLoggedIn);

const makeSelectUserLoading = () =>
  createSelector(selectCap, substate => substate.toJS().loadingUser);

const makeSelectMenuData = () =>
  createSelector(selectCap, substate => {
    const menuData = substate.get('menuData').toJS();
    let parsedMenuData = [];
    if (menuData.status === 'success' && menuData.data) {
      parsedMenuData = getParsedMenuData(menuData.data._actions);
    }
    return parsedMenuData;
  });
export {
  selectCap,
  makeSelectCap,
  makeSelectUser,
  makeSelectOrgDetails,
  makeSelectUserLoading,
  makeSelectLogin,
  isUserLoggedIn,
  makeSelectMenuData,
};
