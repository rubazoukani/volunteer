import React from 'react'
import Button from '../components/form/Button'
import NotFoundImg from "../assets/not-found.png"
import { useNavigate } from 'react-router-dom'

const NotFound = (): React.ReactNode => {
  const navigator = useNavigate()

  return (
    <main className='bg-white flex-center flex-column'>
      <img width={265} height={265} alt='not-found' src={NotFoundImg} />
      <h1 className='py-3 fw-bold text-center'>This page is not exist 404!</h1>
      <Button variant='main' className='py-2 px-5 rounded-pill' onClick={() => navigator("/")}>Go Home</Button>
    </main>
  )
}

export default NotFound