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
    query:''
  }

UpdateBook=(book,shelf)=>{      
  //var currIndex = document.getElementById("ddList").selectedIndex;
  //document.getElementById("ddList").selectedIndex = -1;
  //alert("Selected Index = " + currIndex);
 // var select_box = document.getElementById("ddList");
  //select_box.selectedIndex = currIndex;
  //var currIndex = document.getElementById("ddList").selectedIndex;
  //alert("CurrentIndex"+currIndex)
    //console.log("Shelf Selected is:"+shelf)
    BooksAPI.update(book,shelf).then((newbook)=>{     
      this.getAllBooks()
      //alert("Success!")
    })
    //event.preventDefault();
}// update book

showSearchPageF=()=>{
this.setState({ 
    showSearchPage :!this.state.showSearchPage
})
//alert(this.state.showSearchPage)
}//showme

updateQuery = (query) => {  
  this.setState(() => ({results: []}))        
  console.log("Searching For:"+query)             
  this.setState(()=>({
    query:query
  }))
  
  if (query!=="") {
    BooksAPI.search(query)
    .then((books) => {      
      this.setState(() => ({
        results:books
      }))
    })    
  }else{this.setState(() => ({results: []}))}//if Statment     
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

render() {      
    return (
      <div> 
      <div className="app">     
      <Route exact path='/' render={() => (
        <Booklist 
        books={this.state.books} 
        showSpage={this.showSearchPageF}
        UpdateBook={this.UpdateBook}
        />
      )} />
      <Route path='/search' render={({ history }) => (
        <Searchpage         
        books={this.state.results} 
        query={this.state.query} 
        hideSpage={this.showSearchPageF}
        UpdateBook={this.UpdateBook}
        updateQuery={this.updateQuery}
        /> 
      )} />
      
      </div>
      </div>
    )
  }
}

export default BooksApp