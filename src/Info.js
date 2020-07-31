// import React, { useState, useEffect } from 'react';

// const useInput = (defaultValue) => {
//   const [name, setName] = useState(defaultValue);
//   const onChange = (e) => {
//     const { target : {value}} = e;
//     setName(value);
//   };
//   return { name, onChange };
// }
// const Info = () => {
//   const name = useInput("");
//   const nickName = useInput("");
//   useEffect(() => {
//     console.log("rendering completed : ", name.name);
//     return () => {
//       console.log("cleanup : ", name.name);
//     }
//   }, []);

//   return (
//     <div>
//       <div>
//         <input {...name} />
//         <input {...nickName} />
//       </div>
//       <div>
//         <div>
//           <b>이름 : {name.name}</b>
//         </div>
//         <div>
//           <b>닉네임 : {nickName.name}</b>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useReducer } from 'react';
import useInputs from './useInputs';

// function reducer(state, action) {
//   console.log(state, action)
//   return {
//     ...state,
//     [action.name] : action.value,
//   };
// }

const Info = () => {
  // const [state, dispatch] = useReducer(reducer, {
  //   name: "",
  //   nickName: "",
  // });
  // const {name, nickName} = state;
  // const onChange = (e) => {
  //   dispatch(e.target);
  // };
  const [state, onChange] = useInputs({
    name: "",
    nickName: "",
  });
  const { name, nickName } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickName" value={nickName} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름 : { name }</b>
        </div>
        <div>
          <b>닉네임 : { nickName }</b>
        </div>
      </div>
    </div>
  );
}

export default Info;