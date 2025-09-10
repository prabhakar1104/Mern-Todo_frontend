import React from 'react'

function Header() {
    const navitem = "text-2xl text-blue-800 bg-yellow-800 rounded-md p-2";
  return (
    <>
    <div className='flex justify-center gap-4 mt-6'>
        <h2 className={navitem}>About</h2>
        <h2 className={navitem}>Home</h2>
        <h2 className={navitem}>Friends</h2>
        <h2 className={navitem}>Profile</h2>
    </div>
    </>
    )
}

export default Header