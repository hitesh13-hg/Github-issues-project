/**
 *
 * Cap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import injectSaga from '../../utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectCap, makeSelectUser} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { injectIntl, intlShape } from 'react-intl';
import TopBar from '../../components/TopBar';
import Sidebar from '../../components/Sidebar';
import { UserIsAuthenticated } from '../../utils/authWrapper';


/* eslint-disable react/prefer-stateless-function */
const CapWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export class Cap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [
        {
          group: props.intl.formatMessage(messages.header),
          items: [
            {
              link: '/sms',
              text: props.intl.formatMessage(messages.menu1),
              value: 'SMS',
            },
            {
              link: '/wechat',
              text: props.intl.formatMessage(messages.menu2),
              value: 'WECHAT',
            }
          ],
        },
        {
          group: props.intl.formatMessage(messages.campaignsDashboard),
          items: [
            {
              link: '/campaign/index',
              text: props.intl.formatMessage(messages.campaignsDashboard),
              value: 'Campaigns Home',
              external: true,
            },
          ],
        },
      ],
    };
  }
  render() {
    const userData = this.props.cap;
    const query = new URLSearchParams(this.props.location.search)
    const type = query.get("type");
    // const changeOrg = this.props.actions.changeOrg;
    // const logout = this.props.actions.logout;
    console.log('props', this.props);
    const proxyOrgList = [];
    let defaultOrgName = '';
    let defaultOrgId = '';
    let userName = '';
    const navigateToDashboard = this.navigateToDashboard;
    if (userData && userData.user && userData.user !== '') {
      console.log('Org name ', userData.user.orgName, userData.user.orgID);
      defaultOrgName = userData.user.orgName;
      defaultOrgId = userData.user.orgID;
      proxyOrgList.push({ text: defaultOrgName, value: defaultOrgId });
      const orgList = userData.user.proxyOrgList;
      if (!_.isEmpty(orgList)) {
        _.forEach(orgList, (item) => {
          const id = item.orgID;
          let name = item.orgName;
          if (id === 486) {
            name = 'Demo Org';
          }
          proxyOrgList.push({ key: id, text: name, value: id });
        });
      }
      userName = userData.user.firstName;
    }
    const actionComponents = "";
    const toastMessages = this.props.cap.messages;
    const loggedIn = this.props.cap.isLoggedIn;


    const productMenuData = [
      // {
      //   text: this.props.intl.formatMessage(messages.creatives),
      //   value: 'Creatives',
      //   url: '/creatives/ui/',
      // },
    ];
    if (this.props.cap.currentOrgDetails) {
      _.forEach(this.props.cap.currentOrgDetails.module_details, (module) => {
        if (module.display_order > 0) {
          productMenuData.push({
            text: (messages[module.name]) ? this.props.intl.formatMessage(messages[module.name]) : module.name,
            value: module.name.toLowerCase(),
            url: module.url,
          });
        }
      });
    }

    return (
      <CapWrapper>
        <Helmet>
          <title>Cap</title>
          <meta name="description" content="Description of Cap" />
        </Helmet>
        <div className="wrapper">
          {loggedIn && type !== 'embedded' ?
            <TopBar
              proxyOrgList={proxyOrgList}
              userName={userName}
              orgName={defaultOrgName}
              orgID={defaultOrgId}
              changeOrg={this.changeOrg}
              navigateToDashboard={navigateToDashboard}
              logout={this.logout}
            /> : ''}
          <div className="main">
            {loggedIn && type !== 'embedded' ? <div id="cap-sidebar" className={'sidebar'}>
              <Sidebar
                menuData={this.state.menuData}
                productMenuData={productMenuData}
                actionComponents={actionComponents}
                router={this.props.router}
              />
            </div> : '' }
            <div className="main-content">

            </div>
          </div>
        </div>
        {(toastMessages && toastMessages.length > 0) ?
          <Toastr timeout={4000} messagesList={toastMessages} position="top-right" handleRemoveMessage={this.handleRemoveMessage} />
          : ''}
        {this.props.cap.fetching_userdata &&
        <div className="cap-loader-box">
          <img
            className="loader-image"
            src="https://s3.amazonaws.com/fileservice.in/intouch_creative_assets/88561f46de9407021cad.gif"
            alt="Capillary"/>
        </div>
        }
      </CapWrapper>
    );
  }
}

Cap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cap: makeSelectCap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cap', reducer });
const withSaga = injectSaga({ key: 'cap', saga });

export default UserIsAuthenticated(compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(withRouter(Cap))));
