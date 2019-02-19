import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup
  //Meteor.call is how you call the methods you have defined
  //Meteor.call parameters: method name as a string

  //req stores things about the incoming requests
  //res allows us to respond to http request
  //next allows the app to keep moving on

  WebApp.connectHandlers.use((req, res, next) => {
    //storing barsed id from the url, using slice we can start where we chose to on the string
    const _id = req.url.slice(1);
    //findOne gets only one
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
  //
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   //Set HTTP status code
  //   //res.statusCode = 404;
  //   //Set HTTP headers
  //   //res.setHeader('my-custom-header', 'Jordan was here');
  //   //Set HTTP body
  //   //res.write('<h1>This is my middleware at work</h1>');
  //   //End HTTP request
  //   //res.end();
  //
  //   next();
  // });

});
