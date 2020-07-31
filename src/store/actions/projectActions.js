import firebase from 'firebase/app';
import 'firebase/storage'

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // do some ASYNC CALL to DATABASE(= Firebase)
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const storageRef = firebase.storage().ref('test').child(project.title);
    const docRef = firestore.collection('projects').doc();

    storageRef.put(project.video)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => console.log(url))
      // docRef.set({
      //   ...project,
      //   authorFirstName: profile.firstName,
      //   authorLastName: profile.lastName, 
      //   authorId: authorId,
      //   createdAt: new Date(),
      //   videoRef: url,
      // })
      .then(() => {
        console.log('success!');
        dispatch({type: 'CREATE_PROJECT', project });
    })
    .catch((err) => {
      console.log('failed!');
      dispatch({type: 'CREATE_PROJECT_ERROR', err});
    }) 

 
  }
};

export const deleteProject = (project, ownProps) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      project.userId,
      project.userPassword
    ).then(() => {
      firestore.collection('projects').doc(project.docId).delete();
    }).then(() => {
      dispatch({type: 'DELETE_PROJECT', project})
    }).then(() => {
      ownProps.history.push('/');
    }).catch((err) => {
      dispatch({type: 'DELETE_PROJECT_ERROR', err})
    })
  }
}

export const updateProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore.collection('projects').doc(project.docId).update({
      content: `${project.content}`,
      title: `${project.title}`,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch({type: 'UPDATE_PROJECT', project})
    }).catch((err) => {
      dispatch({type: 'UPDATE_PROJECT_ERROR', err})
    })
  }
};