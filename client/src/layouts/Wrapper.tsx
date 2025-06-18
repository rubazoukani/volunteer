import React from 'react'
import Sidebar from './Sidebar'
import { CommonParent } from '../misc/types'

const Wrapper = ({ children }: CommonParent): React.JSX.Element => {
  return (
    <main className='d-flex'>
      <Sidebar />

      <div className="py-3 px-2 flex-1">
        {children}
      </div>
    </main>
  )
}

export default Wrapper