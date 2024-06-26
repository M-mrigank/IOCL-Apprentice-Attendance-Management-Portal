import React from 'react'
import './apprentice.css';

const DetailApprentice = ({user, role}) => {
  return (
    <div className="p-6">
        <form className="flex flex-col w-[100%] gap-y-4 mt-6">
            <div className='w-[100%] flex justify-between gap-x-4'>
                <label  htmlFor='firstName' className='flex gap-x-2'>
                    <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>First Name</p>
                    <input input type='text' placeholder={user?.firstName} name='firstName' disabled
                    className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
                </label>
                <label  htmlFor='lastName'  className='flex gap-x-2'>
                    <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Last Name</p>
                    <input input type='text' placeholder={user?.lastName} name='lastName' disabled
                    className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
                </label>
                </div>
            <label  htmlFor='email'  className='flex gap-x-7'>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Email</p>
                <input input type='email' placeholder={user?.email} name='email' disabled
                className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
            </label>
            <label  htmlFor='address'  className='flex gap-x-2'>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Address</p>
                <input input type='address' placeholder={user?.address} name='email'
                className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
            </label>
            <label  htmlFor='reg'  className='flex gap-x-2'>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Registered On</p>
                <input input type='reg' placeholder={user?.registeredOn?.split('T')[0]} name='reg' disabled
                className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
            </label>
        </form>
        <div className='mt-10 w-[100%] flex flex-col gap-y-6'>

            <div className='flex w-[100%] justify-around gap-x-5'>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Total working days: <span>0</span></p>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Total days present: <span>0</span></p>
            </div>

            <div className='flex w-[100%] justify-around gap-x-5'>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Total El left: <span>0</span></p>
                <p className='text-lg mb-1 leading-[1.375rem] font-semibold'>Total CL left: <span>0</span></p>
            </div>
        </div>
    </div>
  )
}

export default DetailApprentice