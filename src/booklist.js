import React, { Component } from 'react';
import Bookcom from './bookcom'
import { Link } from 'react-router-dom'

class Booklist extends Component {
  render() {
    let books = this.props.books
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }
    if (books.length > 0) {
      return (
        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads v3</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(shelves).map((shelf) =>
                  <div className="bookshelf" key={shelves[shelf][1]}>
                    <h2 className="bookshelf-title">{shelves[shelf][0]}</h2>
                    <div className="bookshelf-books" data-placeholder='data-placeholder'>
                      <Bookcom
                        books={books.filter(book => book.shelf === shelves[shelf][1])}
                        UpdateBook={this.props.UpdateBook}
                        getshelf={this.props.getshelf}
                      />
                    </div>
                  </div>
                )}
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
          <img alt="Loading..." src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        </div>
      );//return
    }//else

  }//render
}//class

export default Booklist;