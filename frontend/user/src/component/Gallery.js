import React, { useState, useEffect } from "react";
import { STATIC_URL } from "../helper/api";
import Images from "./Images";

export default function Gallery(props) {
  const {images} = props;

  const [selectedImg, setSelectedImg] = useState("");

  const getImagePath = (image) => {
    if(image){
      let filename_pieces = image.split('/');
      let img_name = filename_pieces[filename_pieces.length - 1];
      return STATIC_URL + img_name;
    }
    return null;
  }

  useEffect(()=>{
    if(images)
    {
      setSelectedImg(getImagePath(images[0]['image']))
    }
  }, [images])


  return (
    <div className="gallery-main">
      <div className="container">
        <img src={selectedImg} alt="Selected" className="selected" />
        <div className="imgContainer">
          {images && images.map((img, index) => (
              <img
                key={index}
                src={getImagePath(img['image'])}
                alt="not fount"
                onClick={() => setSelectedImg(getImagePath(img['image']))}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
