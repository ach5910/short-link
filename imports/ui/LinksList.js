import React, { Component} from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount(){
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            console.log('New Links', links);
            this.setState({ links });
          });
    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }

    renderLinksListItems(){
        if(this.state.links.length === 0){
            return (
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
        })
    }

    render(){
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}