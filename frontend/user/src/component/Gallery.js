import React, {useState} from 'react';
import Images from './Images';


 
export default function Gallery() {
  const[selectedImg, setSelectedImg] = useState(Images[2]);


  
  return(

<div className="gallery-main">
 <div className="container">
   <img src={selectedImg} alt="Selected" className="selected"/>
   <div className="imgContainer">
     {Images.map((img, index)=>(
       <img 
       key={index} 
       src={img} 
       alt="not fount"
       onclick={() => setSelectedImg(img)}
       />
     ))}
   </div>
 </div>
</div>
    
  );

}