import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilter extends Component{
    constructor(props){
        super(props);
        this.state = {
            showVisible: false
        }
    }

    componentDidMount(){
        this.linksTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            })
        })
    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }
    render(){
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type='checkbox' checked={!this.state.showVisible} onChange={(e) => {
                        Session.set('showVisible', !e.target.checked)
                    }}/>
                    show hidden links
                </label>
            </div>
        )
    }
}