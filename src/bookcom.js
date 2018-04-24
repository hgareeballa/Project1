import React, { Component } from 'react';

class Bookcom extends Component {
  render() {
    let books = this.props.books
    const { UpdateBook } = this.props
    return (
      <ol className="books-grid">
        {(books.length > 0) ?
          (
            books.map((books) => (
              <li key={books.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128, height: 193,
                      backgroundImage: `url(${(books.imageLinks !== undefined) ?
                        (books.imageLinks.smallThumbnail) : ('')})`
                    }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select value={this.props.getshelf(books)} id="ddList" onChange={(event) => UpdateBook(books, event.target.value)}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{books.title}</div>
                  <div className="book-authors">{books.authors}</div>                  
                </div>
              </li>
            ))
          ) :
          ("")}
      </ol>
    );
  }
}

export default Bookcom;
