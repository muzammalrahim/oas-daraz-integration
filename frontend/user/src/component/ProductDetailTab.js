
import React, {Component} from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {Tabs, Tab, Modal, Row, Button, Col, Form, Card, Container} from "react-bootstrap";
 import Rating from '../component/Rating';



 
 class ProductDetailTab extends Component{
     constructor(props) {
         super(props);
         this.state = {
            open: -1
          };
       
     }
 
     render() {
         return (
             
            <div className="product-detail-tabs p-3 border">
                <Tabs className=" pt-2 pl-3 pr-3 bg-light"  defaultActiveKey="Home" 
                    id="controlled-tab-example">
                  <Tab className="p-4" eventKey="Details" title="Details">
                      <p>The Model is wearing a white blouse from our stylist's 
                        collection, see the image for a mock-up of what the actual 
                        blouse would look like.it has text written on it in a black 
                        cursive language which looks great on a white color.</p>
                        <div class="part">
                          <h5 class="inner-title">Material &amp; Care:</h5>
                          <p>Top fabric: pure cotton</p>
                          <p>Bottom fabric: pure cotton</p>
                          <p>Hand-wash</p>
                      </div>
                  </Tab>
                  <Tab className="p-4" eventKey="Specification" title="Specification">
                  <div class="single-product-tables">
                    <table>
                        <tbody>
                            <tr>
                                <td>Sleeve Length</td>
                                <td>Sleevless</td>
                            </tr>
                            <tr>
                                <td>Neck</td>
                                <td>Round Neck</td>
                            </tr>
                            <tr>
                                <td>Occasion</td>
                                <td>Sports</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>Fabric</td>
                                <td>Polyester</td>
                            </tr>
                            <tr>
                                <td>Fit</td>
                                <td>Regular Fit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                  </Tab>
                  <Tab className="p-4" eventKey="Video" title="Video" >
                      <h1>dwr</h1>
                  </Tab>
                  <Tab className="p-4" eventKey="Write Review" title="Write Review" >
                  <div class="form-row row write-review">
                        <div class="col-md-12">
                            <div class="media">
                              <label>Rating</label>
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                <div class="media-body ms-3">
                                    <div class="rating three-star"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter Your name" required=""/>
                        </div>
                        <div class="col-md-6">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" id="email" placeholder="Email" required=""/>
                        </div>
                        <div class="col-md-12">
                            <label for="review">Review Title</label>
                            <input type="text" class="form-control" id="review" placeholder="Enter your Review Subjects" required=""/>
                        </div>
                        <div class="col-md-12">
                            <label for="review">Review Title</label>
                            <textarea class="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>
                        </div>
                        <div class="col-md-12">
                            <button class="btn btn-solid" type="submit">Submit YOur
                                Review</button>
                        </div>
                    </div>
                  </Tab>
              </Tabs>
            </div>
              
                     
         );
     }
 }
 
 export default ProductDetailTab;
