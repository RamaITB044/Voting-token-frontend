// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import { DocumentData, QuerySnapshot, addDoc, getDocs } from 'firebase/firestore';
// import { collection } from 'firebase/firestore';
// import { db } from '../../firebase';

// const Elections = () => {
//     const dataref = collection(db, "Elections");
//     const [elections, setElections] = useState<DocumentData[]>([]);
//     getDocs(dataref)
//         .then((QuerySnapshot)=>{
//             // console.log(QuerySnapshot);
//             QuerySnapshot.forEach(doc => {
//                 const data = doc.data();
//                 // setElections({...Elections, data});
//                 // elections.push(doc.data);
//                 console.log(elections);
//             });
//         })
//         .catch((error)=>{
//             console.log("error");
//         })
//     // useEffect(() => {
//     // },)
    
//   return (
//     <div className='flex h-[100vh] w-[100vw] '>
//         <Navbar/>
//         <div className='h-[100%] w-[100%] border border-t border-2 border-black'>
//             <div className='m-[5%] border border-t border-2 border-black  '>
//                 {elections.map((election, electionid)=> (
//                     <div className='w-[100%] '>
//                         {/* <p>Election name : {election.data.Election_Name}</p> */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Elections

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { DocumentData, QuerySnapshot, getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const Elections = () => {
  const dataref = collection(db, "Elections");
  const [elections, setElections] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(dataref);
        const data: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setElections(data);        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='flex h-[100vh] w-[100vw]'>
      <Navbar />
      <div className='h-[100%] w-[100%] '>
        <div className='m-[5%] flex-col'>
          {elections.map((election, electionid) => (
            <div key={electionid} className='w-[100%] p-[2%] flex m-2 border border-t border-2 border-black '>
              <div className='flex flex-col w-[50%]'>
              <p>Election name: {election.Election_Name}</p>
              <p>Election Head: {election.Commision_Head}</p>
              </div>
              <div className='flex flex-row justify-between w-[100%] ' >
                <Link to='/voter_list'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Voter List</button></Link>
                <Link to='candidate_list'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Candidate List </button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Elections;
