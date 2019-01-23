import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Image, Dropdown, Popup } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import { loadItem } from 'services/localStorageApi';
import messages from './messages';
import './_topbar.scss';

const logo = require('./assets/images/capillary_logo.png');

class TopBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    debugger
    this.state = {
      activeItem: '',
      orgList: [],
      selectedOrg: loadItem('orgID'),
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orgID !== this.props.orgID) {
      this.props.navigateToDashboard();
    }
  }

  handleOrgChange(data) {
    const orgId = data.value;
    if (this.state.selectedOrg !== orgId) {
      this.props.changeOrg(orgId);
      this.setState({ selectedOrg: orgId });
    }
  }

  handleItemClick(e) {
    this.setState({ activeItem: e.target.id });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    debugger;
    const proxyOrgList = this.props.proxyOrgList;
    const defaultOrgName = this.props.orgName;
    const selectedOrg = loadItem('orgID');
    return (
      <Menu className="navbar" key="navbar">

        <Menu.Item key="logo" as={Link} to="/" name="logo" className="logo-container" onClick={this.handleItemClick}>
          <Image className="logo" src={logo} alt="Capillary Technologies" />
        </Menu.Item>

        { proxyOrgList.length > 1 ?
          <Menu.Item className="dropdownItem" key="orgSelection">
            <FormattedMessage {...messages.dropdownMessage}>
              {(message) => <Dropdown
                placeholder={message}
                className="org-list-drp-dwn"
                defaultValue={selectedOrg}
                search
                options={proxyOrgList}
                selection
                onChange={(event, data) => this.handleOrgChange(data)}
              />}
            </FormattedMessage>
          </Menu.Item> :
          <Menu.Item key="default-org">
            {defaultOrgName}
          </Menu.Item>
        }

        <Menu.Menu position="right">
          <Menu.Item key="first-name">
            <FormattedMessage {...messages.hi} />&nbsp;{this.props.userName}!
          </Menu.Item>
          <Menu.Item key="user-details">
            <Popup
              trigger={<i className="material-icons">person</i>}
              content={< div className="ui secondary vertical menu">
                <a href="" className="item hide"><FormattedMessage {...messages.profile} /><i className="user icon" /></a>
                <a href="" className="item hide"><FormattedMessage {...messages.settings} /> <i className="settings icon" /></a>
                <a href="" className="item" onClick={this.logout}><FormattedMessage {...messages.logout} />
                  <i className="sign out icon" /></a> </div >}
              on="click" position="bottom right" offset={7}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

    );
  }
}

TopBar.propTypes = {
  userName: PropTypes.string,
  proxyOrgList: PropTypes.array,
  orgName: PropTypes.string,
  orgID: PropTypes.number,
  navigateToDashboard: PropTypes.func,
  changeOrg: PropTypes.func,
  logout: PropTypes.func,
};

export default TopBar;
