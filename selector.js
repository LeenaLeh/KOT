if (Meteor.isClient) {
	today = new Date(); // Set current date 	
 	
 	Template.selector.helpers({
 		'today': function () {	 //Set value to date input
 		return today; 			//.toLocaleDateString(); next step is local time format
 		}
	});

  	Template.selector.events({
	'click #datepicker': function() {
		$('#datepicker').datepicker({
			weekStart:1,
			format: "dd.mm.yyyy", 
			endDate: "today",});
	},
	'submit form': function (event) {
    		event.preventDefault();
    		var currentUserId = Meteor.userId();
    		var todayVar = Date.parse(event.target.datepicker.value); //Get value from input. Will be replaced with datepicker
    		var startVar = new Date(todayVar); // Will be replaced with datepicker
            
            //Get minutes
            var stopMinutes = event.target.timeSelector.value;
            
            //Set used time
    		var stopVar = new Date(startVar.getTime() + (stopMinutes*60000)); 
    		var usedTimeVar = stopVar - startVar;
            
            //Comment
            var comment = event.target.comment.value;
            
            //Save to DB
     		HoursList.insert({
     				userId: currentUserId,
      			start: startVar,
      			stop: stopVar,
      			usedTime: usedTimeVar,
                comment: comment
    		});
    	}
  	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
