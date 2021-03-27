function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}import Draggable from "https://cdn.skypack.dev/react-draggable@4.4.3";

const firebaseConfig = {
  apiKey: "AIzaSyA-d-scFLXO1arrfgI_RIrwVUCLNAnZd8M",
  authDomain: "tits-540ba.firebaseapp.com",
  projectId: "tits-540ba",
  storageBucket: "gs://tits-540ba.appspot.com/",
  messagingSenderId: "718495970764",
  appId: "1:718495970764:web:a2bdd1097920794c1dd969",
  measurementId: "G-XHF0L20JK1" };


firebase.initializeApp(firebaseConfig);

let storageRef = firebase.storage().ref();

let cat = "https://pbs.twimg.com/media/Euhf7bOXcAIiek0?format=jpg&name=small";

let myIllusts = [];

function getWindowSize() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight };

}

function getRandomTop() {
  return Math.random() * getWindowSize().windowHeight * 3 / 2;
}

function getRandomLeft() {
  return Math.random() * getWindowSize().windowWidth / 1.7;
}

class App extends React.Component {
  constructor() {
    super();_defineProperty(this, "returnRandomSpot",






    () => {
      return {
        position: "absolute",
        top: getRandomTop() + "px",
        left: getRandomLeft() + "px" };

    });this.state = { illustContainerTwo: [], imageUrls: [] };}

  componentDidMount() {
    let imageUrlList = [];
    let self = this;

    storageRef.child('images').listAll().
    then(list => {

      list.items.forEach(function (listItem) {
        listItem.getDownloadURL().then(url => {

          imageUrlList.push(url);
          self.setState({ imageUrls: imageUrlList }, function () {
            console.log(this.state.imageUrls.length);
            self.state.imageUrls.forEach(function (url) {
              console.log("OUTSIDE: " + url);
            });
          });
        });
      });
    });
  }


  render() {
    let illustContainer = [];

    for (let i = 0; i < 10; i++) {
      let randomSpot = this.returnRandomSpot();
      let isHidden = true;
      if (i < this.state.imageUrls.length) {
        isHidden = false;
      }

      illustContainer.push( /*#__PURE__*/
      React.createElement(Draggable, { handle: "img" }, /*#__PURE__*/
      React.createElement("div", { className: "no", style: randomSpot }, /*#__PURE__*/
      React.createElement("img", { src: this.state.imageUrls[i],
        alt: "some thing",
        hidden: isHidden }))));



    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "item" },
      illustContainer, /*#__PURE__*/

      React.createElement("div", { id: "about" }, /*#__PURE__*/
      React.createElement("p", null, "follow me on",
      " ", /*#__PURE__*/
      React.createElement("a", { href: "https://www.instagram.com/campus.securityy/" }, "instagram"))), /*#__PURE__*/


      React.createElement("div", { id: "text" }, /*#__PURE__*/
      React.createElement("h1", null, "badfolio"), /*#__PURE__*/
      React.createElement("p", null, "an archive for the unarchived"))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("body"));