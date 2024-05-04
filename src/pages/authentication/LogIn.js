import React, { useContext } from 'react'
import { ApiContextProvider } from '../../context/ApiContext'
import Loading from '../../components/Loading'

const LogIn = () => {
  const apiContext = useContext(ApiContextProvider)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  return (
    <div style={{ backgroundImage: "url(/images/signup-page.jpg)" }} className='p-3 h-[100vh] bg-cover bg-center flex flex-col justify-center'>
      {apiContext?.setApiMessage}
      <div className='flex text-center flex-col gap-3 p-3 rounded-xl bg-white w-full max-w-xl mx-auto shadow-lg'>
        <h1 className='text-2xl'>تسجيل حساب جديد</h1>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault()
          apiContext.logIn({ email: email, password: password })
        }} className='flex flex-col gap-2 text-start'>
          <div className='flex flex-col'>
            <p>البريد الالكتروني</p>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className='flex flex-col'>
            <p>كلمة المرور</p>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
          <hr />
          <div className='flex gap-3'>
            <p onClick={() => apiContext?.navigate('/auth/sign-up/')} className='text-sm text-blue-600 cursor-pointer'>ليس لديك حساب؟</p>
          </div>
          {
            apiContext?.loginLoading ? (
              <button className='btn-primary'><Loading /></button>
            ) :
              <button type='submit' className='btn-primary'>تسجيل</button>
          }
        </form>
      </div>
    </div>
  )
}

export default LogIn