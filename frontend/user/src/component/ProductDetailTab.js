import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab, Modal, Row, Button, Col, Form, Card, Container} from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

 export default function ProductDetailTab(props){
    const [rating, setRating] = useState(0);

    return (
            <div className="product-detail-tabs p-3 border">
                <Tabs className=" pt-2 pl-3 pr-3 bg-light"  defaultActiveKey="Home" 
                    id="controlled-tab-example">
                  <Tab className="p-4" eventKey="Details" title="Details">
                      <p>The Model is wearing a white blouse from our stylist's 
                        collection, see the image for a mock-up of what the actual 
                        blouse would look like.it has text written on it in a black 
                        cursive language which looks great on a white color.</p>
                        <div className="part">
                          <h5 className="inner-title">Material &amp; Care:</h5>
                          <p>Top fabric: pure cotton</p>
                          <p>Bottom fabric: pure cotton</p>
                          <p>Hand-wash</p>
                      </div>
                  </Tab>
                  <Tab className="p-4" eventKey="Specification" title="Specification">
                  <div className="single-product-tables">
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
                  <div className="form-row row write-review">
                        <div className="col-md-12">
                            <div className="media">
                              <label>Rating</label>

                              <Rating name="read-only" value={rating} emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                onChange={(event, newValue)=>{setRating(newValue)}} />

                                {/* <div className="media-body ms-3">
                                    <div className="rating three-star"><i className="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required=""/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Email" required=""/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="review">Review Title</label>
                            <input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required=""/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="review">Review Title</label>
                            <textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>
                        </div>
                        <div className="col-md-12 mt-3">
                            <a className="btn btn-primary" type="submit">Submit</a>
                            <a className="btn btn-secondary ml-2" type="submit">Cancel</a>
                        </div>
                    </div>
                  </Tab>
              </Tabs>
            </div>
         );
 }
 