import { useState } from 'react'
import { useClubAuthContext } from './useClubAuthContext'
import { axiosClubsInstance } from '../../instance/Axios'
import { loginClub, paymentCheck, nameNav } from '../../redux-toolkit/clubLoginReducer'
import { useDispatch } from 'react-redux'

export const useClubLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  // const { dispatch } = useClubAuthContext()
  const dispatch = useDispatch()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await axiosClubsInstance.post("/login", { email, password })
      console.log(result, "clubFetchuseLogin");

      if (result.status === 200) {
        console.log("success");
        //save the user to local storage
        localStorage.setItem('club', JSON.stringify(result))

        //update the ClubauthContext
        // dispatch({ type: 'CLUBLOGIN', payload: result })
        dispatch(loginClub(result.data))
        dispatch(paymentCheck(result.data))
        dispatch(nameNav(result.data.name))
        // setIsLoading(false)
        // toast.success(`Welcome ${result.data.name} !!!!`)

        return result.data.name

          setIsLoading(false)
      }

    }
    catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        const Error = err.response.data.mssg
        setIsLoading(false)
        setError(Error)
      }

    }


  }

  return { login, isLoading, error }
}