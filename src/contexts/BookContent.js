import React, { createContext, useState } from 'react'

export const BookContext = createContext();

const BookContextProvider = (props) => {
  console.log(props);
  const [books, setBooks] = useState([
    { title : "name of the wind", id : 1 },
    { title : "the way of kings", id : 2 },
    { title : "the final empire", id : 3 },
    { title : "maybe i fall in love", id : 4 },
  ]);
  return ( 
    <BookContext.Provider value={{books}}>
      { props.children }
    </BookContext.Provider>
   );
}
 
export default BookContextProvider;
