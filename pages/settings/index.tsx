import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
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
      <div style={{ margin: '10%' }}>
        <h2>あなたのIDは</h2>
        <p>{loginUser?.user.id}</p>
      </div>
    </div>
  )
}

export default Index
