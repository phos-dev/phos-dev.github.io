import React, {Component} from 'react';
import './faceimage.css'

const FaceImage = ({image, boxs}) => {
    return (
        <div className="faceimage">
            <div className="relative">
                <img id="imgA" alt='' src={image}/>
                {
                    boxs.map((face, index) => {
                        return (
                            <div key={index} className="bounding-box" style={{
                                top: face.top_row, 
                                left: face.left_col,
                                bottom: face.bottom_row,
                                right: face.right_col}}>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
export default FaceImage;