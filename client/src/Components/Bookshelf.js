import React, {useState, useEffect} from 'react';
import Book from './Book';
import Axios from 'axios';


function Bookshelf(props){ 
    let {count} = props;
    // Initialize the state as an empty array of books on the shelf
    const [books,setBooks] = useState([]);
    
    // Set the amount of books in the bookshelf on component mount and/or when count changes
    useEffect(() => {
        console.log(count)
        Axios.get('/api').then( res => {
          setBooks([...res.data]); 
        }
            ).catch(err => console.log(err))
        
    }, [count])
        
   
    // Render each book compenent with individual props
    return(
    <div className='container-fluid' id='bookshelf'>
        <h1>BookShelf</h1>
        <div id='c'>
    {books.map((e,i) => 
    <Book key={'boook'+i} book={e} />)
    }
        </div>
    </div>
    )
}

export default Bookshelf;