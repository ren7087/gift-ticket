import { Session } from '@supabase/supabase-js'
import { type } from 'os'
import { useEffect, useState } from 'react'
import supabase from '../utils/supabase-client'

const UseUser = () => {
	const [session, setSession] = useState<Session | null>()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				return setSession(session)
			}
		)

		const setupUser = async () => {
			if (session?.user.id) {
				const { data: user } = await supabase
					.from('users')
					.select('*')
					.eq('id', session.user.id)
					.single()
				setUser(user)
			}
		}
		setupUser()

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [session])

	function signInWithGoogle() {
		supabase.auth.signInWithOAuth({ provider: 'google' })
	}

	function signOut() {
		supabase.auth.signOut()
	}

	return {
		session,
		user,
		signInWithGoogle,
		signOut,
	}
}

export default UseUser
