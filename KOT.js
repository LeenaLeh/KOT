Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
    tasks: function () {
    // Show newest tasks first
    return Tasks.find({}, {sort: {createdAt: -1}});
  }, 
  total: function () {
    var total = 0;
    Tasks.find().map(function(doc) {
      total += parseInt(doc.hours);
        })
    return total;
    }
});
Template.body.events({
  "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      var hours = event.target.hours.value;
      var comment = event.target.comment.value;
      Tasks.insert({
      hours: hours,
      comment: comment,
      createdAt: new Date() // current time
    });
      // Clear form
      event.target.hours.value = "";
      event.target.comment.value = "";
      // Prevent default form submit
      return false;
    }
  });
}