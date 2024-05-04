import React from 'react'
import Loading from './Loading'

const LoadingScreen = () => {
  return (
    <div className='fixed right-0 z-50 flex flex-col justify-center items-center bg-opacity-40 top-0 w-[100vw] h-[100vh] bg-indigo-200'>
      <Loading />
    </div>
  )
}

export default LoadingScreen
