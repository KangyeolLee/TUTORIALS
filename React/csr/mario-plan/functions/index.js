const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Notification Creator
const createNotification = (notification => {
  return admin.firestore().collection('notifications').add(notification)
    .then(doc => console.log('notification added', doc))
})

// When create new project
exports.projectCreated = functions.firestore.document('projects/{projectId}').onCreate(doc => {
  const project = doc.data();
  const notification = {
    content: 'Added a new project',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification);
})

// When join new user
exports.userJoined = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: 'Joined the party',
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }
      return createNotification(notification);
    })
})

// When update a project
exports.projectUpdated = functions.firestore.document('projects/{projectId}').onUpdate(doc => {
  const project = doc.after.data();
  const notification = {
    content: 'Updated a project',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification);
})

// When delete a project
exports.projectDeleted = functions.firestore.document('projects/{projectId}').onDelete(doc => {
  const project = doc.data();
  const notification = {
    content: 'Deleted a project',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification);
})