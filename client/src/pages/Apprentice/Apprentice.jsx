import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ApprenticeList from './ApprenticeList';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import preloader from "../../assets/preloader-unscreen.gif";
import DetailApprentice from './DetailApprentice';
import './apprentice.css';

const Apprentice = ({popUpData}) => {
    const location=useLocation();
    // console.log(location);

    let apprenticeRecord=useSelector((state)=>(state.apprenticeRecordReducer));
    // console.log("apprentice page", apprenticeRecord);
    // console.log(apprenticeRecord.allApprenticeDetails)

    var record=apprenticeRecord.allApprenticeDetails;
    // console.log(typeof(record));

    const [selectData, setSelectData] = useState(record);
    const [fsName, setFsName] = useState("");
    const [lsName, setLsName] = useState("");

    useEffect(() => {
        setSelectData(record);
    }, [record]);

    
    
    function handleFirstName(event){
      // console.log("hi1");
      setFsName(event.target.value);
    }
    function handleLastName(event){
      // console.log("hi2");
      setLsName(event.target.value);
    }
    

    function submitHandler(event) {
      event.preventDefault();
      const filteredData = record.filter((data) => {
          const matchesFirstName = fsName === "" || data.firstName?.toLowerCase()?.includes(fsName.toLowerCase());
          const matchesLastName = lsName === "" || data.lastName?.toLowerCase()?.includes(lsName.toLowerCase());
          return matchesFirstName && matchesLastName;
      });
      setSelectData(filteredData);
    }
          
  return (
    <div className='w-[100%] h-[100%] '>
      <div className="flex justify-between mt-8 max-w-max relative">
                <form className='flex gap-x-4 justify-between w-full' onSubmit={submitHandler}>
                  <div className='flex gap-x-5'>
                    <label className='w-full flex justify-between' htmlFor='firstName'>

                      <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold pr-9 text-lg'>First Name</p>

                      <input required type="text" name="firstName" onChange={handleFirstName} placeholder="Enter First Name" value={fsName} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    </label>
                    <label className='w-full flex justify-between' htmlFor='lastName'>

                      <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold text-lg'>Last Name</p>

                      <input required type="text" name="lastName" onChange={handleLastName} placeholder="Enter Last Name" value={lsName} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    </label>
                  </div>
                  <button className='bg-white rounded-md p-3 mt-0.5 mb-0.5 ring-2 focus:border-orange-400 focus:ring-orange-500 focus-ring-1'>
                    <BsSearch fontSize={24}/>
                  </button>
                </form>
            </div>
          <div className="flex flex-col rounded-md border-2 mt-6 ">
            <div className='w-full mt-3 mb-4'>
              <p className="text-center font-semibold ">Apprentice Record</p>
            </div>
            <Table className='border shadow-2xl flex flex-col'>
                <Thead className='border'>
                    <Tr className='border bg-orange-100'>
                        <Th className='p-2 border pl-5 pr-5'>
                            S.N
                        </Th>
                        <Th className='p-2 border pl-10 pr-7'>
                            First Name
                        </Th>
                        <Th className='p-2 border pl-10 pr-10'>
                            Last Name
                        </Th>
                        <Th className='p-2 pl-12 pr-36'>
                            Email ID
                        </Th>
                        <Th className='p-2 border pl-12 pr-10'>
                            Registered On
                        </Th>
                    </Tr>
                </Thead>
                <Tbody className='border'>
                  {
                    selectData===null && 
                    <div className='max-w-max mx-auto flex flex-col justify-center align-center h-56'>
                      <div className='flex justify-center align-center'>
                        <img src={preloader} alt="IOCL"/>
                      </div>
                      <h1 className='font-semibold text-2xl'>Loading..</h1>
                    </div>
                  }
                {
                  selectData?.map((apprentice, index)=>(
                    <Tr key={index} className="border rounded hover:bg-sky-100 cursor-pointer" onClick={()=>popUpData(apprentice)}>
                      <Td className='text-center p-2 border font-semibold text-zinc-900 pl-5 pr-9'>
                        {index+1}
                      </Td>
                      <Td className='text-center p-2 border font-semibold text-zinc-900 pl-10 pr-10'>
                        {apprentice?.firstName}
                      </Td>
                      <Td className='text-center p-2 border font-semibold text-zinc-900 pl-10 pr-10'>
                        {apprentice?.lastName}
                      </Td>
                      <Td className='text-center p-2 border font-semibold text-zinc-900 pl-12 pr-12'>
                        {apprentice?.email}
                      </Td>
                      <Td className='text-center p-2 border font-semibold text-zinc-900 pl-10 pr-16'>
                        {apprentice?.registeredOn?.split('T')[0]}
                      </Td>
                    </Tr>
                  ))
                }
                </Tbody>
            </Table>
        </div>
      </div>
  )
}

export default Apprentice