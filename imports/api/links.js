import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

//This is making it so users can only see the links they add, not other links other users add
if (Meteor.isServer) {
    //Any user who subscribes to this will see what the below code allows.
    //The below code uses a function call and not an arrow function call because we need to use the this.bind call.
    //Arrow functions do not allow the this.bind call
    Meteor.publish('links', function() {
      return Links.find({ userId: this.userId });
    });
}

//Methods should be defined on the server and the client
//This allows us to render things to the screen as quickly as possible
//Methods allow for secure changes to happen in the database
//Below is how to define Methods
Meteor.methods({
  'links.insert'(url) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    //This is to validate the method insert to make sure urls are what they intend to be
    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({url})

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  'links.setVisibility'(_id, visible) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible })

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({ _id }, {
      $set: {
        //This is creating a time stamp
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
