import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Draggable from "react-draggable";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA-d-scFLXO1arrfgI_RIrwVUCLNAnZd8M",
  authDomain: "tits-540ba.firebaseapp.com",
  projectId: "tits-540ba",
  storageBucket: "gs://tits-540ba.appspot.com/",
  messagingSenderId: "718495970764",
  appId: "1:718495970764:web:a2bdd1097920794c1dd969",
  measurementId: "G-XHF0L20JK1"
};

firebase.initializeApp(firebaseConfig);

let storageRef = firebase.storage().ref();

let cat = "https://pbs.twimg.com/media/Euhf7bOXcAIiek0?format=jpg&name=small";

let myIllusts = [];
let imageUrlList = [];

function getWindowSize() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight
  };
}

function getRandomTop() {
  return (Math.random() * getWindowSize().windowHeight*3) / 2;
}

function getRandomLeft() {
  return (Math.random() * getWindowSize().windowWidth) / 2;
}

class App extends React.Component {
  constructor(){
    super();
    this.state={
      illustContainerTwo:[],
      imageUrls:[],
    };
  }

  returnRandomSpot = () => {
    return {
      position: "absolute",
      top: getRandomTop() + "px",
      left: getRandomLeft() + "px"
    };
  };
  
  componentDidMount() {
    let self = this;

    storageRef.child('images').listAll()
        .then((list) => {

          list.items.forEach(function(listItem) {
            listItem.getDownloadURL().then((url) => {

              imageUrlList.push(url)
              self.setState({imageUrls: imageUrlList}, function() {
                console.log(this.state.imageUrls.length)
                self.state.imageUrls.forEach(function(url) {
                  console.log("OUTSIDE: " + url);
                });
              });
            });
          });
        });
  }


  render() {
    let illustContainer = [];

     for (let i = 0; i < imageUrlList.length; i++) {
      let randomSpot = this.returnRandomSpot();
      let isHidden = true;
      if (i < this.state.imageUrls.length) {
        isHidden = false;
      }

      illustContainer.push(
          <Draggable handle="img">
            <div className="no" style={randomSpot}>
              <img src={this.state.imageUrls[i]}
                   alt="some thing"
                   hidden={isHidden}/>
            </div>
          </Draggable>
      );
    }

    return (
      <div className="item">
        {illustContainer}

        <div id="about">
          <p>
            Art and code by Erika Wang | {" "}
            <a href="https://codepen.io/erikawawawa">CodePen</a> |{" "}
            <a href="https://www.instagram.com/campus.securityy/">Instagram</a>
          </p>
        </div>
        <div id="text">
          <h1>badfolio</h1>
          <p>an archive for the unarchived</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
