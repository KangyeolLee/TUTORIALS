import React, { useState, useEffect, useRef, useCallback } from 'react';
import useAxios from './customHooks/useAxios';

// import { useInput } from './customHooks/useInput';
// import { useTabs } from './customHooks/useTabs';

// const contents = [
//   {
//     tab: "section 1",
//     content: "I'm the content of the Section 1",
//   },
//   {
//     tab: "section 2",
//     content: "I'm the content of the Section 2",
//   },
//   {
//     tab: "section 3",
//     content: "I'm the content of the Section 3",
//   },
// ];

// const App = () => {
//   const { currentItem, changeItem } = useTabs(0, contents);

//   return (
//     <div className="App">
//       { contents.map((section, index) => (
//         <button onClick={() => changeItem(index)}>{section.tab}</button>)
//       )}
//       <div>
//         { currentItem.content }
//       </div>
//     </div>
//   );
// }



const App = () => {
  const { loading, data, error, refetch } = useAxios({ url: 'https://yts-proxy.now.sh/list_movies.json' });
  console.log(`Loading: ${loading}\ndata: ${JSON.stringify(data)}\nerror: ${error}`);
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{ loading && "loading" }</h1>
      <h2>{ data && data.status }</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  )
}

export default App;
