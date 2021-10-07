//import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';

// import Particles from 'react-particles-js';
const app = new Clarifai.App({
 apiKey: '41612d77fc144671aed228ebd8298e50'
});


// const ParticlsOptions = {
//       "particles": {
//           "number": {
//               "value": 15
//           },
//           "size": {
//               "value": 3
//           }
//       },
//       "interactivity": {
//           "events": {
//               "onhover": {
//                   "enable": false ,
//                   "mode": "repulse"
//               }
//           }
//       }
//   };
  

                        

class App extends Component {
  constructor(){
    super();
    this.state= {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedin: false
    }
  }

 calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

displayFaceBox = (box) => {
    this.setState({box: box});
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));  
}

onRouteChange = (route) => {
  if (route === 'signout') {
     this.setState({isSignedIn: false})
  } else if (route === 'home') {
   this.setState({isSignedIn: true})
  }
  this.setState({route: route});

}



  render() {
   return (

    <div className="App">
          {/*<Particles className='particles' params={ParticlsOptions} />*/}
         
          <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                <Logo />
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          </div>
          { this.state.route === 'home' 
            ? <div>
                <Rank /> 
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}  />
              </div>
            : (
              this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
          )
        }
    </div>
   );
 }
}

export default App;
