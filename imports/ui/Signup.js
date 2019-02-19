import React from 'react';
import { Link } from 'react-router';
import { Accounts } from'meteor/accounts-base';

export default class Signup extends React.Component {
  //Defining constructor for thie react component
  constructor(props) {
    //this makes sure the react component gets everything it needs
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    //This prevents the browsers default action, which is to go through a full page refresh, we don't want that
    e.preventDefault();

    //All referances are stored in this.refs
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if(password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long'})
    }
    Accounts.createUser({email, password}, (err) => {
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>

          {/*Using the terrinary opperator if there is an error the system returns whatever is after the question mark below*/}
          {/*If the error is not there, meaning there was no error. Undefined is returned and nothing happens*/}
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}
