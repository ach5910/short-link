import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import LinksList from './LinksList';
import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';
import AddButton from './AddButton';
import LinksListFilter from './LinksListFilter';

export default () => {
    return (
        <div>            
            <PrivateHeader title='Your Links' />
            <div className="page-content">
                <LinksListFilter />
                <AddButton />
                <LinksList />
            </div>
        </div>
    )
}