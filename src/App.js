import React from 'react'
import * as BooksAPI from './BooksAPI'
import Booklist from './booklist'
import Searchpage from './searchpage'
import './App.css'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
    results:[],
    query:'',
    notfoundtxt:false

  }

UpdateBook=(book,shelf)=>{   
  this.state.books.forEach(function(bk) {
    if (bk.id === book.id) {        
      bk.shelf=shelf
    }//if      
  });    
  this.setState(()=>({
  books:this.state.books
  }))
  BooksAPI.update(book,shelf).then((newbook)=>{     
      //this.getAllBooks()              
  })    
        
}// update book

updateQuery = (query) => {    
  this.setState(()=>({
    query:query,
    results:[]
  }))
  if (query!=="") {
    BooksAPI.search(query)
    .then((books) => {      
      this.setState(() => ({
        results:books
      }))
    if (books.length>0){
      this.setState(()=>({        
        notfoundtxt:false
      }))      
    }//if
    else{
      this.setState(()=>({        
        notfoundtxt:true
      }))    
    }//else

    })    //then
  }else{this.setState(() => ({results: [],notfoundtxt:false}))}//if Statment     
}    // update quer

getAllBooks=()=>{    
  BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })      
}//getall boos

componentDidMount() {  
this.getAllBooks()  
}//comdid mount

getshelf=(books)=>{
  var x = 'none'
  if (books.shelf) {
    x=books.shelf    
  }else{    
    this.state.books.forEach(function(bk) {
      if (bk.id === books.id) {        
        x=bk.shelf
      }//if      
    });        
  }
  //console.log("XX"+x)
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
        notfoundtxt={this.state.notfoundtxt}
        />         
      )} />
      
      </div>
      </div>
    )
  }
}

export default BooksApp