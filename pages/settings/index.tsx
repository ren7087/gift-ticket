import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import SettingNavbar from '../../components/SettingNavbar'
import supabase from '../../utils/supabase-client'

const Index = () => {
  const [loginUser, setLoginUser] = useState<Session | null>(null)
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setLoginUser(session)
  }
  useEffect(() => {
    getSession()
  }, [])
  return (
    <div>
      <Navbar />
      <SettingNavbar />
      <div
        style={{
          margin: '2% 30% 10% 30%',
          backgroundColor: '#F1F5F9',
          padding: '5% 10%',
          height: '100px',
          width: '20%',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <h2>あなたのIDは</h2>
        <p>{loginUser?.user.id}</p>
      </div>
    </div>
  )
}

export default Index
