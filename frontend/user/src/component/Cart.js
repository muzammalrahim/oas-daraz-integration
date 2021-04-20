import React, { Component } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import "../assets/style.css"


export default class Cart extends Component {
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
      <div className=" cart-menu left-menu float-right pr-3">
        <span onClick={this.showMenu}>
        <FaShoppingCart/>
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
                  <li>ITEM 1</li>
                  <li>ITEM  2</li>
                  <li>ITEM  3</li>
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
 