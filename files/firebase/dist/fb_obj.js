import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'; //'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js'; //'firebase/auth';
import { getDocs, doc, getFirestore, collection, setDoc, getDoc, query, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'; //'firebase/firestore';
//import { admin } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-admin.js'; //'admin/admin';

const firebaseApp = initializeApp ({
    apiKey: "AIzaSyBIsY6pcYKe9u2UhAk2nVfrE5vrqkW0K2Q",
    authDomain: "vfire-2d94d.firebaseapp.com",
    projectId: "vfire-2d94d",
    storageBucket: "vfire-2d94d.appspot.com",
    messagingSenderId: "637959601581",
    appId: "1:637959601581:web:cc40e2fa09a09657e3f524"
});


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

//const Users = collection(db,'users');

const email = "v0990091.bg@rest.md", password = "hello-hello";

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    out(`> Signed, Email: ${user.email}\n`);
  })
  .catch((error) => {
    out(`ERROR: ${error.code}\n${error.message}`);
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      out(`| EMAIL: ${auth.currentUser.email}\n| UID: ${uid}\n| EMAIL: ${user.email}\n`);
    } else {
      // User is signed out
      out("USER SIGNED OUT.")
    }
  });


const docRef = doc(db, "users", "D1");

getDoc(docRef)
  .then( docSnap => {
    out(`Fetch successful, (${docSnap.exists()?"EXISTS":"NULL"})\nObject: ${JSON.stringify(docSnap.data())}\nID: ${docSnap.id}\nNAME: ${docSnap.get('name')}.`)
  })
  .catch( err => out("ERROR: " + err));

const Out = document.getElementById('out');
function out(x) { Out.innerText += `${x}\n`; }

/*export function ListItems(collect) {
  out(`\nTHE LIST FOR (${collect}):`);
  const q = query(collection(db,collect));
  getDocs(q)
  .then(docs => {  
    docs.forEach((doc) => {
      out(`---- ${doc.id}: ${doc.data().name}`);
    });
    //out(JSON.stringify(docs));
  })
  .catch( err => out("ERROR: " + err));
}*/

export async function ListItems(collect) {
  out(`\nTHE list FOR (${collect}):`);
  const q = query(collection(db,collect));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
      out(`---- ${doc.id}: ${doc.data().name}`);
  });
}
window.ListItems = ListItems;
