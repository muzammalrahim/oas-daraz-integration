import React, { Component } from 'react'



export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="collection-collapse-block open">
                    <h3 class="collapse-block-title">Brand</h3>
                    <div className="collection-collapse-block-content">
                        <div className="collection-brand-filter">
                            <div className="custom-control custom-checkbox collection-filter-checkbox">
                                <input type="checkbox" class="custom-control-input" id="zara"/>
                                <label class="custom-control-label" for="zara">Lorem Ipsum</label>
                            </div>
                            <div className="custom-control custom-checkbox collection-filter-checkbox">
                                <input type="checkbox" class="custom-control-input" id="zara"/>
                                <label class="custom-control-label" for="zara">Lorem Ipsum</label>
                            </div>
                            <div className="custom-control custom-checkbox collection-filter-checkbox">
                                <input type="checkbox" class="custom-control-input" id="zara"/>
                                <label class="custom-control-label" for="zara">Lorem Ipsum</label>
                            </div>
                            <div className="custom-control custom-checkbox collection-filter-checkbox">
                                <input type="checkbox" class="custom-control-input" id="zara"/>
                                <label class="custom-control-label" for="zara">Lorem Ipsum</label>
                            </div>
                        </div>
                    </div>
                </div> 

                {/* Sizes */}
                <div class="color-selector">
                                        <ul>
                                            <li class="color-1 active"></li>
                                            <li class="color-2"></li>
                                            <li class="color-3"></li>
                                            <li class="color-4"></li>
                                            <li class="color-5"></li>
                                            <li class="color-6"></li>
                                            <li class="color-7"></li>
                                        </ul>
                                    </div>

            </div>
        )
    }
}
