import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import LogIn from '../ui/LogIn';

const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
}

const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isauthenticatedPages = authenticatedPages.includes(pathname);
  
    if (isUnauthenticatedPage && isAuthenticated){
      browserHistory.replace('/links');
    }else if(isauthenticatedPages && !isAuthenticated){
      browserHistory.replace('/')
    }
}
window.browserHistory = browserHistory;
const unauthenticatedPages = ['/', '/singup'];
const authenticatedPages = ['/links']
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={LogIn} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} />
  </Router>
)
