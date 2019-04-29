/**
 *
 * Cap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { isEqual, find } from 'lodash';
import { injectIntl } from 'react-intl';
import { CapSpin } from '@capillarytech/cap-ui-library';
import injectSaga from '../../utils/injectSaga';
import componentRoutes from './routes';
import NavigationBar from '../../components/NavigationBar';
import { makeSelectCap, makeSelectMenuData } from './selectors';
import sagas from './saga';
import * as actions from './actions';
import config from '../../config/app';

const gtm = window.dataLayer || [];

export class Cap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.Global.fetching_userdata) {
      this.props.actions.getUserData();
    }
    if (this.props.Global.user) {
      const userGtmData = this.getUserGtmData(this.props);
      gtm.push(userGtmData);
    }
    if (this.props.Global.orgID !== undefined) {
      gtm.push({ orgId: this.props.Global.orgID });
    }
    // if (this.props.Global.isLoggedIn) {
    //   if (
    //     this.props.Global.user &&
    //     Object.keys(this.props.Global.user).length
    //   ) {
    //     // gtm.push({userId: this.props.Global.user.id});
    //     // this.props.appActions.getSidebar();
    //   }
    // }
  }

  /*componentWillReceiveProps(nextProps) {
    if (
      !nextProps.Global.settingProxyOrg &&
      nextProps.Global.changeProxyOrgSuccess &&
      !isEqual(
        nextProps.Global.changeProxyOrgSuccess,
        this.props.Global.changeProxyOrgSuccess,
      )
    ) {
      this.navigateToDashboard();
    }
    if (
      nextProps.Global.user &&
      this.props.Global.user &&
      nextProps.Global.user.refID !== this.props.Global.user.refID
    ) {
      const userGtmData = this.getUserGtmData(nextProps);
      gtm.push(userGtmData);
    }

    if (
      nextProps.Global.isLoggedIn &&
      nextProps.Global.isLoggedIn !== this.props.Global.isLoggedIn
    ) {
      if (
        nextProps.Global.orgID !== undefined &&
        !isEqual(nextProps.Global.orgID, this.props.Global.orgID)
      ) {
        const userGtmData = this.getUserGtmData(nextProps);
        gtm.push(userGtmData);
      }
    }
    const { currentOrgDetails } = nextProps.Global;
    if (!isEqual(currentOrgDetails, this.props.Global.currentOrgDetails)) {
      this.props.actions.getMenuData('org');
    }
  } */

  getUserGtmData = props => {
    const { user: userData } = props.Global;
    const userName = userData.attributes.USERNAME;
    const userEmail = userData.attributes.EMAIL;
    const orgObj = find(userData.proxyOrgList, { orgID: props.Global.orgID });
    const gtmData = {
      orgId: props.Global.orgID,
      orgName: orgObj && orgObj.orgName,
      userId: userData.refID,
      userName: userName && userName.value,
      userEmail: userEmail && userEmail.value,
      isCapUser: userData.isCapUser,
    };
    return gtmData;
  };

  handleRemoveMessage = messageIndex => {
    this.props.actions.removeMessageFromQueue(messageIndex);
  };

  updateMenu = id => {
    this.props.actions.updateMenu(id);
  };

  navigateToDashboard = () => {
    const defaultPage =
      process.env.NODE_ENV === 'production'
        ? `${config.production.dashboard_url}/list`
        : config.development.dashboard_url;
    const originUrl = window.location.origin;
    window.location.href = `${originUrl}${defaultPage}`;
  };

  logout = () => {
    if (process.env.NODE_ENV === 'production') {
      const logout_url = config.production.logout_url;
      const originUrl = window.location.origin;
      const logoutpage = `${originUrl}${logout_url}`;
      localStorage.removeItem('token');
      localStorage.removeItem('orgID');
      localStorage.removeItem('ouId');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('lastReport');
      window.location.href = logoutpage;
    } else {
      this.props.actions.logout();
    }
  };

  changeOrg = orgId => {
    this.props.actions.changeOrg(orgId, this.navigateToDashboard);
  };

  changeOu = ouId => {
    this.props.actions.changeOu(ouId);
  };

  getDefaultSelectedMenuItem = () => {
    const { menuData, history } = this.props;
    const { pathname } = history.location;
    let selectedMenuItem = '';
    menuData.forEach(obj => {
      if (obj.link === pathname) {
        selectedMenuItem = obj.key;
      }
    });
    return selectedMenuItem;
  };

  render() {
    const { menuData } = this.props;
    const loggedIn =
      this.props.Global.isLoggedIn &&
      (this.props.Global.orgID === 0 || this.props.Global.orgID);
    return (
      <CapSpin
        spinning={this.props.Global.fetching_userdata}
        className="cap-container spinner"
      >
        <Helmet>
          <title>Cap</title>
          <meta name="description" content="Description of Cap" />
        </Helmet>
        {loggedIn && (
          <NavigationBar
            componentRoutes={componentRoutes}
            userData={this.props.Global}
            menuData={[]}
            menuItemsPosition="left"
            changeOrg={this.changeOrg}
            logout={this.logout}
            settingsUrl="/org/index"
            defaultSelectedMenuItem={this.getDefaultSelectedMenuItem()}
          />
        )}
      </CapSpin>
    );
  }
}

Cap.propTypes = {
  Global: PropTypes.object,
  history: PropTypes.object,
  actions: PropTypes.object,
  menuData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  Global: makeSelectCap(),
  menuData: makeSelectMenuData(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose(
  ...withSaga,
  withConnect,
)(injectIntl(Cap));
