import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Make a collection for posts. Add new posts into collection after moving them to feed.
//Add premade posts so the page isn't empty on start. Something like: Welcome to Inspire. Feel free to login.
//Do more customisation. Maybe divide navbar loading into its own js file. Makes this whole thing look more professional.
//Add commented out console logs for TA to use for evaluation.


//Global variables. Including in memory database.
var loki = require('lokijs');
var db = new loki('database.json');
var accounts = db.addCollection('accounts');
var post_history = db.addCollection('post_history');

//Checks that page has loaded. When loaded initializes code.
if (document.readyState !== "loading") {
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

//Renders the page and activates 2 buttons.
function initializeCode() {
  console.log("Initializing");
  ReactDOM.render(<App />, document.getElementById('root'));
  //Actives login buttons
  document.getElementById("Login_button").addEventListener("click", loginManager);
  document.getElementById("Logout_button").addEventListener("click", logoutManager);
  //Creates premade data.
  lokiCreateAccountsData();
  lokiCreatePremadeMessages();
}

//Handles login.
function loginManager(){
  var account_name = document.getElementById("login_name").value;
  var account_password = document.getElementById("login_password").value;
  //Check if account name and password match
  var info = accounts.find({
    name:account_name,
    password:account_password
  });

  if (info.length !== 0){
    document.getElementById("Login_status1").innerHTML = "logged in as " + account_name;
    document.getElementById("Login_status2").innerHTML = "logged in as " + account_name;
    document.getElementById("Login_button").removeEventListener("click", loginManager);
    //If logged in then it activates posting support.
    document.getElementById("send_button").addEventListener("click", new_post);
  } else {
    alert("Login failed.");
    console.log("Login failed.");
  }
}

//Handles logout.
function logoutManager(){
  //Clear all login info
  document.getElementById("login_name").value = "";
  document.getElementById("login_password").value = "";
  document.getElementById("Login_status1").innerHTML = "Not logged in";
  document.getElementById("Login_status2").innerHTML = "Not logged in";
  document.getElementById("Login_button").addEventListener("click", loginManager);
  //Deactivates posting support.
  document.getElementById("send_button").removeEventListener("click", new_post);
}


//Make a new post
function new_post() {
  //Make new post and clear input field
  let post_text = document.getElementById("new_post").value;
  let poster_name = document.getElementById("Login_status2").value;//This is temporary, store curently logged in somewhere
  //Check's if textbox is empty.
  let poster_name_comparison = document.getElementById("Login_status2").innerHTML.slice(13);
  if (post_text === "" || poster_name_comparison === "Not logged in" ) {
    return;
  }

  document.getElementById("new_post").value = "";

  //idcounter gives each post its id. Id increases inside movetofeed -function
  var idcounter = 1;
  idcounter = movetofeed(post_text, poster_name_comparison, idcounter);
}

//Moves newly created post to feed
function movetofeed(post_text, poster_name, i) {
  let postblock = document.getElementById("post_feed");

  //Creates new div for the post
  let textdiv = document.createElement("div");
  textdiv.setAttribute("class", "row");
  postblock.insertBefore(textdiv, postblock.firstChild);

  //Adds divider above post
  let linebreak = document.createElement("div");
  linebreak.setAttribute("class", "divider");
  postblock.insertBefore(linebreak, postblock.firstChild);

  //Text paragraph and poster name config
  let paragraph = document.createElement("p");
  paragraph.setAttribute("id", poster_name+ "no" + i);
  paragraph.setAttribute("class", "col s12");
  paragraph.innerHTML = post_text;
  textdiv.insertBefore(paragraph, textdiv.firstChild);

  let poster = document.createElement("p");
  poster.setAttribute("id", poster_name);
  poster.setAttribute("class", "col s12");
  poster.innerHTML = "Posted by: " + poster_name;
  textdiv.appendChild(poster);

  if (post_text !== "These are premade posts so don't worry about responding to these." || post_text !== "Welcome to Inspire. Feel free to share your toughts!"){
    addtodatabase((poster_name+ "no" + i), poster_name, post_text);
  }
  return i++;
}

//Creates accounts that the user can log into. This is done because we use in-memory data storage.
function lokiCreateAccountsData(){
  accounts.insert({ name: "admin", password: "admin" });
  accounts.insert({ name: "user1", password: "user1" });
  accounts.insert({ name: "user2", password: "user2" });
  //console.log(accounts.data);
}

//Creates premade messages for feed.
function lokiCreatePremadeMessages(){
  var admin1 = post_history.insert({ postid: "adminno0", poster_name: "admin", post_text: "Welcome to Inspire. Feel free to share your toughts!" });
  var admin2 = post_history.insert({ postid: "adminno1", poster_name: "admin", post_text: "These are premade posts so don't worry about responding to these." });
  //Renders messages.
  movetofeed(admin2.post_text, admin2.poster_name, 0);
  movetofeed(admin1.post_text, admin1.poster_name, 1);
}

//Adds newly made posts to database.
function addtodatabase(postid,poster_name,post_text){
  var new_data = post_history.insert({ postid: postid, poster_name: poster_name, post_text: post_text });
}

//Automatically made code and text below.
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
