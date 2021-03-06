import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            justCopied: false
        };
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({ justCopied: true});
            setTimeout(() => this.setState({ justCopied: false}), 1000);
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link.');
        })
    }

    componentWillUnmount(){
        this.clipboard.destroy();
    }

    renderStat(){
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visistedMessage = null;
        if (typeof this.props.lastVisited === 'number'){
            visistedMessage =  `(visited ${moment(this.props.lastVisited).fromNow()})`
        }
        return (
            <p className="item__message">{this.props.visitedCount} {visitMessage} - {visistedMessage}</p>
        )
    }

    render(){
        return(
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStat()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button className="button button--pill" ref='copy' data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'Copied' : 'Copy'}</button>
                <button className="button button--pill" onClick={() => {Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}

LinksListItem.propTypes = {
    url: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisited: React.PropTypes.number
}