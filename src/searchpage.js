import React, { Component } from 'react';
import Bookcom from './bookcom'
import {Link} from 'react-router-dom'

class Searchpage extends Component {      
    render() {        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">        
                <input type="text" placeholder="Search by title or author"
                value={this.props.query}
                onChange={(event) => this.props.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results" id="SearchResultsPlace">
            {(this.props.notfoundtxt)?(<div className="bookshelf-books"><b><h1>Books not found</h1></b></div>):("")}   
            {(this.props.loadingtxt)?(<div className="bookshelf-books"> <img alt="Loading..." src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /></div>):("")}
                <Bookcom 
                books={this.props.books} 
                UpdateBook={this.props.UpdateBook}
                getshelf={this.props.getshelf}
                />
            </div>
          </div>
        );
    }
}

export default Searchpage;