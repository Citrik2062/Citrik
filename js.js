var firebaseConfig = {
    apiKey: "AIzaSyAfmddsg9sUgU1LkUWlVNXaG3RtqhMChQE",
    authDomain: "citriks-chatroom.firebaseapp.com",
    databaseURL: "https://citriks-chatroom-default-rtdb.firebaseio.com",
    projectId: "citriks-chatroom",
    storageBucket: "citriks-chatroom.appspot.com",
    messagingSenderId: "408933092425",
    appId: "1:408933092425:web:9982f68038b56f5d8d8398",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Enter Your Name");
  
  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const msgInput = document.getElementById("msgInput");
    const message = msgInput.value;
  
    // clear the input box
    msgInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
  
  const fetchChat = db.ref("messages/");
  
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    document.getElementById("messages").innerHTML += message;
  });