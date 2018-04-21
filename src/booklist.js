import React, { Component } from 'react';
import Bookcom from './bookcom'
import {Link} from 'react-router-dom'

class Booklist extends Component {
  
  render() {
    let books = this.props.books
    //(books.length > 0)?("ak"):("less")
    if (books.length >0) {
      return (                
        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books"  data-placeholder='data-placeholder'>                  
                  <Bookcom 
                  books={books.filter(book => book.shelf ==='currentlyReading')}
                  UpdateBook={this.props.UpdateBook}
                  dvalue="currentlyReading"
                  />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books" data-placeholder='data-placeholder'>
                  <Bookcom 
                  books={books.filter(book => book.shelf ==='wantToRead')}
                  UpdateBook={this.props.UpdateBook}
                  dvalue="wantToRead"
                  />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <Bookcom 
                  books={books.filter(book => book.shelf ==='read')}
                  UpdateBook={this.props.UpdateBook}
                  dvalue="read"
                  />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>                
    );//return
    } else {
      return (     
          <div className="bookshelf-books">
          <img alt="Loading..."src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />          
          </div>                
    );//return
    }//else
    
  }//render
}//class

export default Booklist;