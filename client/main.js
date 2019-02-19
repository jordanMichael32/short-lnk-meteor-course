import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

//The below code redirects users based on login authentication
Tracker.autorun(() => {
  //!! takes the fale or true value and converts it into a true boolean
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//Defining a simple stateless functional component
//Is a component and can be used like a regular Component
//It is just a function it is not an ES6 class
//Does not support states!

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
