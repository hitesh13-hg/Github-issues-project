/**
 *
 * Form
 *
 */

import React from 'react';
import Form from 'antd';
import { CapButton } from '@capillarytech/cap-ui-library';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class CapHocForm extends React.Component {
  render() {
    return (
      <>
        <Form {...this.props}>{this.props.children}</Form>
        <CapButton>milind</CapButton>
      </>
    );
  }
}

Form.propTypes = {};

export default {
  FormItem: Form.Item,
  create: Form.create,
  CapForm: CapHocForm,
};
