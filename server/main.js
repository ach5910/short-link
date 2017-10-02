import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if(link){
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    }else{
      next();
    }
    
  });
});
// const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regex: SimpleSchema.Regex.Phone
  //   }
  // });

  // petSchema.validate({
  //   name: 'Spot',
  //   age: 14,
  //   contactNumber: '1234sbc'
  // })

    // const empSchema = new SimpleSchema({
    //   name: {
    //     type: String,
    //     min: 1,
    //     max: 200
    //   },
    //   hourlyWage: {
    //     type: Number,
    //     min: 0
    //   },
    //   email: {
    //     type: String,
    //     regEx: SimpleSchema.RegEx.Email
    //   }
    // })

    // empSchema.validate({
    //   name: 'Pete',
    //   hourlyWage: 12.5,
    //   email: 'ahha@nonsense.com'
    // })
