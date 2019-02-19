import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  //Using a life sycle method
  //You do not call built in life cycle methods
  componentDidMount() {
    console.log('componentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      //The String in subscribe needs to be the same as the String in the publication
      //Now the code is subscribed to the publication.
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }

  //The below code updates information to the screen the correct way
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    //This is to stop the above tracker from running when a link is gone.
    //You don't want to try and set the state once a link is gone, that will cause errors.
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      //Using the pread operator on link
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
       //return <p key={link._id}>{link.url}</p>
    });
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
