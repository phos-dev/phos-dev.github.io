import React, { Component } from 'react';
import Navigation from './Navigation';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import FaceImage from './faceimage';
const config = {
    particles: {
        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 500,
            }
        }
    }
}


const app = new Clarifai.App({apiKey: '4f434f9d3af24e798918ca96c8807ac0'});

class App extends Component {
    constructor() {
        super();
        this.state = {
            Input: '',
            ImageUrl: '',
            boxs: []
        }
    }
    getBox = (data) => {
        const faces = data.outputs[0].data.regions.map((face) => {
            const k = face.region_info.bounding_box;
            const image = document.getElementById("imgA");
            const width = Number(image.width);
            const height = Number(image.height);
            const newFace = {
                top_row: k.top_row * height,
                bottom_row: height - (k.bottom_row * height),
                left_col: k.left_col * width,
                right_col: width - (k.right_col * width)
            };
            return newFace;
        });
        this.setState({boxs: faces});
        this.setState({box: this.state.boxs[0]});
    }
    onSubmit = () => {
        this.setState({ImageUrl: this.state.Input});
        app.models
        .predict( Clarifai.FACE_DETECT_MODEL, this.state.Input)
        .then(response => this.getBox(response))
        .catch(err => console.log(err));
    }
    onInputChange = (event) => {
        this.setState({Input: event.target.value});
    }
    render() {
        return (
            <div className="App">
                <link href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap" rel="stylesheet"></link>
                <Navigation /> 
                <FaceImage image={this.state.ImageUrl} boxs={this.state.boxs}/>
                <div className="Input">
                    <div className="Title">Put an image link below and I'll detect faces.</div>
                    <div className="UserInput">
                        <input type="text" placeholder="Image link here" onChange={this.onInputChange}/>
                        <button type="submit" onClick={this.onSubmit}>Submit</button>
                    </div>
                </div>
                
                <Particles className="particles"
                    params={config}
                />
            </div>
        );
    }
}
export default App;