const config = {
    apiKey: "AIzaSyDfrFSvLkngJZPCpvq6lq5DVC0-lCDOanc",
    authDomain: "at-formation-353d2.firebaseapp.com",
    projectId: "at-formation-353d2",
    storageBucket: "at-formation-353d2.appspot.com",
    messagingSenderId: "922755252542",
    appId: "1:922755252542:web:ffde24f83f45b8e9742c6f",
    measurementId: "G-HBHQZSWGT3"
}
function login (){
    const e = document.getElementById('email').value
    const p = document.getElementById('password').value
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)) return document.getElementById('error-message').classList.remove("hidden"); document.getElementById('error-message').innerText = "invalid email"
    if(p.length<8) return document.getElementById('error-message').classList.remove("hidden"); document.getElementById('error-message').innerText = "invalid password"
    console.log('login in with  ',e,p)
    firebase.auth().signInWithEmailAndPassword(e,p)
    .then((userCredential)=>{
        console.log(userCredential)
    })
    .catch((error)=>{
      console.log(error.code)
    })
  }
document.onreadystatechange = function () {
    if(document.readyState != "complete") return
    firebase.initializeApp(config)
}