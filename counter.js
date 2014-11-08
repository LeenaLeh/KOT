// Storage for counter state
CounterState = new Meteor.Collection('stateStore');
if (Meteor.isClient) {
	Session.setDefault("usedHours", 0);
	Session.setDefault("usedMinutes", 0);
	Session.setDefault("usedSeconds", 0); // Will be removed later
 
  Template.counter.helpers({
 	'timeStart': function () {
 		start = CounterState.findOne();
    	return start.previousState;
 	},
 	'timeStop': function () {
 		return Session.get("stop");
 	},
 	'timeHours': function () {
 		return Session.get("usedHours");
 	},
 	'timeMinutes': function () {
 		return Session.get("usedMinutes");
 	},
 	'timeSeconds': function () {				// Will be removed later
 		return Session.get("usedSeconds");
 	}
});

  Template.counter.events({
    'click #start': function (event) {
    	event.preventDefault();
      Session.set("usedHours", 0);
		Session.set("usedMinutes", 0);
		Session.set("usedSeconds", 0); // Will be removed later
      // Call method to set counter state
      Meteor.call('setCounterState');
    },
    'click #stop': function (event) {
    	event.preventDefault();
      stopp = new Date();
      usedTime = new Date(stopp.getTime() - start.previousState.getTime());
      Session.set("stop", stopp);
      Session.set("usedHours", usedTime.getUTCHours());
      Session.set("usedMinutes", usedTime.getMinutes());
      Session.set("usedSeconds", usedTime.getSeconds());
      
      // Save used hours
      var usedTimeVar = stopp -start.previousState; 
    	HoursList.insert({
      start: start.previousState,
      stop: stopp,
      usedTime: usedTimeVar
      });
      // Call server to reset counter state
      Meteor.call('clearCounterState');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
  	// Set counter state
  	'setCounterState': function () {
  		var counterStarted = new Date();
  		CounterState.insert({previousState: counterStarted});
  	},
  	// Reset counter state
  	'clearCounterState': function () {
  		CounterState.remove({});
  	}
  });
}
