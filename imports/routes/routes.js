import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

//Importing created components
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login'

//array that contains pages that a user should not be able to visit if they are authenticated
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  //below variable will be true if the current pathname is in the unauthenticatedPages array
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
//Creating routes
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
