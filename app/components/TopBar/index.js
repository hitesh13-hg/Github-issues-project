import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { loadItem } from 'services/localStorageApi';
import {find} from 'lodash';
import messages from './messages';
import styles from './_topbar.scss';



const logo = require('./assets/images/capillary_logo.png');
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class TopBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      current: 'app',
      activeItem: '',
      orgList: [],
      selectedOrg: loadItem('orgID'),
    };
    this.logout = this.logout.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orgID !== this.props.orgID) {
      this.props.navigateToDashboard();
    }
  }

  handleOrgChange(orgId) {
    if (this.state.selectedOrg !== orgId) {
      this.props.changeOrg(orgId);
      this.setState({ selectedOrg: orgId });
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.handleOrgChange(e.key);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const proxyOrgList = this.props.proxyOrgList;
    const defaultOrgName = this.props.orgName;
    const selectedOrg = loadItem('orgID');
    const selectedOrgObj = find(this.props.proxyOrgList, {value: parseInt(selectedOrg)});
    const selectedOrgName = selectedOrgObj && selectedOrgObj.text;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
      >
          <Menu.Item key="app" theme="light">
            <img className="logo" src={logo} alt="Capillary Technologies" style={{'width': '200px'}}/>
          </Menu.Item>
          <SubMenu title={<span className="submenu-title-wrapper">{selectedOrgName}</span>}>
            <MenuItemGroup title={selectedOrgName}>
              {proxyOrgList.map((org) => <Menu.Item title="org" key={org.value}>{org.text}</Menu.Item>)}
            </MenuItemGroup>
          </SubMenu>

          <Menu.Item key="profile">
            {/*<i className="material-icons">person</i>*/}
            {/*<a href="" className="item hide"><FormattedMessage {...messages.profile} /> <i className="user icon" /></a>*/}
            {/*<a href="" className="item hide"><FormattedMessage {...messages.settings} /> <i className="settings icon" /></a>*/}
            <a href="" className="item" onClick={this.logout}><FormattedMessage {...messages.logout} />
              <i className="sign out icon" /></a>
          </Menu.Item>


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
