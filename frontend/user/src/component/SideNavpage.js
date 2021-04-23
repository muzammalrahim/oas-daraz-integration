import React, { Component } from 'react';
import { FaBars} from "react-icons/fa";



export default class Card extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();

    this.setState(state => ({
      showMenu : !state.showMenu 
    }));
    
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div className=" cate-menu left-menu float-right">
        <span onClick={this.showMenu}>
          <FaBars/>
        </span>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <ul className="pl-0 categories border">
                  <li>Clothing</li>
                  <li>Electronics</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
 