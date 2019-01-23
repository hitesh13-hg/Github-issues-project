import React from 'react';
import PropTypes from 'prop-types';
import { Form, Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoginError) {
      this.setState({ username: '', password: '' });
    }
  }

  login(event) {
    const formData = { username: this.state.username, password: this.state.password };
    event.preventDefault();
    this.props.authenticate(formData);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.login}>
          <Segment>
            <FormattedMessage {...messages.username} >
              {(message) =>
                <Form.Input
                  type="text" name="username" icon="user" iconPosition="left"
                  placeholder={message} value={this.state.username} onChange={this.handleInputChange}
                />
              }
            </FormattedMessage>
            <FormattedMessage {...messages.password}>
              {(message) =>
                <Form.Input
                  type="password" name="password" icon="lock" iconPosition="left"
                  placeholder={message} value={this.state.password} onChange={this.handleInputChange}
                />
              }
            </FormattedMessage>
            <Form.Button primary fluid loading={this.props.loginInProgress} disabled={this.props.loginInProgress} type="submit">
              {<FormattedMessage {...messages.loginButton} />}
            </Form.Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loginInProgress: PropTypes.bool,
};

export default LoginForm;
