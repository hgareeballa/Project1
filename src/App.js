import React from 'react'
import * as BooksAPI from './BooksAPI'
import Booklist from './booklist'
import Searchpage from './searchpage'
import './App.css'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead test of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    results: [],
    query: '',
    notfoundtxt: false,
    loadingtxt: false
  }//state
  UpdateBook = (book, shelf) => {
    let books = this.state.books
    let results = this.state.results
    const itemindex = books.findIndex(bo => bo.id === book.id)
    if (itemindex !== -1) {
      console.log("Book Found in Books!");
      books[itemindex].shelf = shelf
    } else {
      console.log("Book Found in Results!.");
      books.push(book)
      const itemindex = results.findIndex(bo => bo.id === book.id)
      results[itemindex].shelf = shelf
    }//if
    this.setState(() => ({
      books: books,
      results: results
    }))//update status
    BooksAPI.update(book, shelf)
      .then((newbook) => {
        console.log("Update Done !" + book.id)
      })
  }// update book    
  UpdateBook_old = (book, shelf) => {
    let bkresults = this.state.books.filter(bk => bk.id === book.id).map((x) => {
      x.shelf = shelf
      console.log("book Found in ->Books[]:" + x.id)
      return x
    })//
    if (bkresults.length === 0) {
      this.state.books.push(book)
      console.log("book NOT Found in ->Books[]:" + book.id)
    }
    this.state.results.filter(bk => bk.id === book.id).map((x) => {
      x.shelf = shelf
      console.log("book Found in ->results[]:" + x.id)
      return true
    })//
    this.setState(() => ({
      books: this.state.books,
      results: this.state.results
    }))
    BooksAPI.update(book, shelf)
      .then((newbook) => {
        console.log("Update Done !" + book.id)
      })
  }// update book

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
      results: []
    }))
    if (query !== "") {
      this.setState(() => ({notfoundtxt: false}))
      this.setState(() => ({loadingtxt: true}))
      BooksAPI.search(query)
        .then((books) => {
          this.setState(() => ({loadingtxt: false}))
          this.setState(() => ({results: books}))
          if (books.length > 0) {
            this.setState(() => ({notfoundtxt: false}))
          }//if
          else {
            this.setState(() => ({notfoundtxt: true}))
          }//else

        })    //then
    } else { this.setState(() => ({ results: [], notfoundtxt: false })) }//if Statment     
  }    // update quer

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        //console.log("Done:getAllBooks")
      })
  }//getall boos

  componentDidMount() {
    this.getAllBooks()
  }//comdid mount

  getshelf = (books) => {
    var x = 'none'
    if (books.shelf) {
      x = books.shelf
    } else {
      let itemindex = this.state.books.findIndex(bo => bo.id === books.id)
      if (itemindex !== -1) {
        x = this.state.books[itemindex].shelf
        //console.log(books.id + ":ITEM INDEX:" + itemindex);
      }//if   
    }//ifelse     
    return x
  }//return value for the select list

  render() {
    return (
      <div>
        <div className="app">
          <Route exact path='/' render={() => (
            <Booklist
              books={this.state.books}
              UpdateBook={this.UpdateBook}
              getshelf={this.getshelf}
            />
          )} />
          <Route path='/search' render={({ history }) => (
            <Searchpage
              books={this.state.results}
              query={this.state.query}
              UpdateBook={this.UpdateBook}
              updateQuery={this.updateQuery}
              getshelf={this.getshelf}        
              loadingtxt={this.state.loadingtxt}
              notfoundtxt={this.state.notfoundtxt}      
            />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
