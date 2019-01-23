import PropTypes from 'prop-types';
import React from 'react';
// import styled from 'styled-components';
import { Accordion, Icon, Input, Button } from 'semantic-ui-react';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { Link } from 'react-router';
import messages from './messages';
import './_sidebar.scss';

const Option = Select.Option;

class Sidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: '',
      activeIndex: 0,
      menuItems: this.props.menuData,
      searchText: '',
      visible: true,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
    this.getLinkElement = this.getLinkElement.bind(this);
    this.selectActiveLinkFromUrl = this.selectActiveLinkFromUrl.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
  }

  componentWillMount() {
    this.selectActiveLinkFromUrl(this.props);
  }

  componentWillReceiveProps(nextProp) {
    this.selectActiveLinkFromUrl(nextProp);
    this.setState({ menuItems: nextProp.menuData });
  }

  onProductChange(value) {
    const selectedProductIndex = _.findIndex(this.props.productMenuData, {value: value.toLowerCase()});
    window.location = this.props.productMenuData[selectedProductIndex].url;
    // console.log('On Product selected ', value, selectedProductIndex);
  }

  getAccordian(content, keyValue) {
    return (<Accordion key={keyValue}>{content}</Accordion>);
  }

  getAccordionTitle(title) {
    return (<Accordion.Title>
      <div className="header item">
        <Icon name="dropdown" /> {title}
      </div>
    </Accordion.Title>);
  }

  getAccordionContent(links, keyValue) {
    return (<Accordion.Content key={keyValue}>{links}</Accordion.Content>);
  }

  getLinkElement(to, text, value, isExternal) {
    const selectedItem = (value && value.trim().toLowerCase() === this.state.activeItem) ? 'selected' : '';
    if (text.toLowerCase().includes(this.state.searchText.toLowerCase())) {
      if (isExternal) {
        return ((text.toLowerCase().includes(this.state.searchText.toLowerCase())) ? <a key={to} className={`item menu-item ${selectedItem}`} href={to}>{text}</a> : '');
      }
      return (
          (text.toLowerCase().includes(this.state.searchText.toLowerCase())) ?
            <Link to={to} className={`item menu-item ${selectedItem}`} onClick={this.handleItemClick} key={to} title={text}>{text}</Link>
              : ''
      );
    }
    return '';
  }

  selectActiveLinkFromUrl(props) {
    const activeRoute = props.router.routes[props.router.routes.length - 1];
    const activeRouteName = (activeRoute.name && activeRoute.name.trim().toLowerCase()) || '';
    let selectedItem = '';
    let selectedIndex = -1;
    _.forEach(props.menuData, (menuItem, menuIndex) => {
      if (menuItem.items && typeof menuItem.items === 'object') {
        _.forEach(menuItem.items, (menuData) => {
          // console.log('Menua Data ', menuData, activeRouteName, menuItem);
          if ((menuItem.id && menuData.id.toLowerCase() === activeRouteName.toLowerCase()) || (menuData.value.toLowerCase() === activeRouteName.toLowerCase())) {
            selectedIndex = menuIndex;
            selectedItem = activeRouteName.toLowerCase();
          } else if (activeRouteName === 'assets') {
            selectedIndex = menuIndex;
            selectedItem = 'gallery';
          }
        });
      } else if (menuItem.value.toLowerCase() === activeRouteName.toLowerCase()) {
        selectedIndex = menuIndex;
        selectedItem = activeRouteName.toLowerCase();
      }
    });
    this.setState({ activeIndex: selectedIndex, activeItem: selectedItem });
  }

  toggleSideNav(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible }, () => {
      window.dispatchEvent(new Event('resize'));
      if (!this.state.visible) {
        document.getElementById('cap-sidebar').classList.add('sidebar-collapse');
      } else {
        document.getElementById('cap-sidebar').classList.remove('sidebar-collapse');
      }
    });
  }

  createAccordianElements(title, contentItems) {
    const accordian = [];
    accordian.push(this.getAccordionTitle(title));
    const contentLink = contentItems.map((key) =>
      this.getLinkElement(key.link, key.text, key.value, key.external),
    );
    accordian.push(this.getAccordionContent(contentLink));
    return accordian;
  }

  createNavigationElement(menuItems) {
    const navArray = [];
    _.forEach(menuItems, (key, index) => {
      const headerTitle = key.group;
      const isCategory = Object.prototype.hasOwnProperty.call(key, 'categories');
      if (isCategory) { // attach nested Accordion
        const accordian = [];
        const nestedAcordian = [];
        accordian.push(this.getAccordionTitle(headerTitle));
        const contentAccordian = this.getAccordian(this.createNavigationElement(key.categories), `nestedAccordian-${index}`);
        nestedAcordian.push(contentAccordian);
        const content = this.getAccordionContent(nestedAcordian, `content-${index}`);
        accordian.push(content);
        navArray.push(accordian);
      } else { // attach items to existing accordian
        const accordianElem = this.createAccordianElements(headerTitle, key.items);
        navArray.push(accordianElem);
      }
    });
    // const selectedItem = (this.state.activeItem === 'gallery') ? 'selected' : '';
    // navArray.push(
    //   <Link
    //     to={'/assets'}
    //     className={`item menu-item ${selectedItem} assetItem`}
    //     key={'assets'}
    //     title={'Gallery'}
    //     onClick={(e) => this.handleItemClick(e)}
    //   >Gallery</Link>
    // );
    return navArray;
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleItemClick(e) {
    this.setState({ activeItem: (e.target.text && e.target.text.trim().toLowerCase()) || '' });
  }

  handleTitleClick(e, i) {
    this.setState({ activeIndex: this.state.activeIndex === i ? -1 : i });
  }

  handleSearch(e) {
    this.setState({ searchText: e.target.value });
  }


  render() {
    const visible = this.state.visible;
    const push = !visible ? 'push' : '';
    const collapse = !visible ? 'collapse' : '';
    const toggle = visible ? 'hide' : '';

    // const types = [{ text: 'Creatives', value: 'Creatives' }];
    const productOptions = [];
    if (this.props.productMenuData.length > 1) {
      _.forEach(this.props.productMenuData, (product) => {
        productOptions.push(
          <Option key={product.text} value={product.text}>{product.text}</Option>
        );
      });
    }
    return (
      <div className="sidebar-container">
        <div className={`sidebar sidebar-width ${collapse}`}>
          <div className="searchbar">
            <FormattedMessage {...messages.inputPlaceholder}>{(message) => <Input icon="search" className="sidebar-search" placeholder={message} fluid onChange={this.handleSearch} />}</FormattedMessage>
            <a href="" onClick={this.toggleSideNav}><i className="material-icons control-arrow">arrow_back</i></a>
          </div>

          { this.props.productMenuData.length > 1 ?
            <Select className="icon product-select-menu" defaultValue={'CAMPAIGNS'} onChange={this.onProductChange}>
              {productOptions}
            </Select>
            :
            <div className="module-menu-header">{this.props.productMenuData[0].text}</div>
          }

          <div className="menu-header">
            <span className="menu-title"><FormattedMessage {...messages.menuTitle} /> </span>
            {this.props.actionComponents}
          </div>
          <Accordion className="sidebar-accordian" activeIndex={this.state.activeIndex} onTitleClick={this.handleTitleClick}>
            {this.props.menuData && this.createNavigationElement(this.props.menuData)}
          </Accordion>
        </div>
        <div className={`togglebar ${toggle} ${push}`}>
          <Button icon className="btn-toggle" onClick={this.toggleSideNav}>
            <Icon name="bars" />
          </Button>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  menuData: PropTypes.array.isRequired,
  productMenuData: PropTypes.array.isRequired,
  actionComponents: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Sidebar;
