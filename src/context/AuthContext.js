import { createContext, useEffect, useReducer } from 'react'

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token')
}

const initial_state = {
    user: getUserFromLocalStorage(),
    role: getUserFromLocalStorage()?.role || null,
    token: getTokenFromLocalStorage(),
    loading: false,
    error: null
}

export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null,
                loading: true,
                error: null
            }
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user || null,
                role: action.payload.user?.role || null,
                token: action.payload.token || null,
                loading: false,
                error: null
            }
        case 'LOGIN_FAILURE':
            return {
                user: null,
                role: null,
                token: null,
                loading: false,
                error: action.payload
            }
        case 'REGISTER_SUCCESS':
            return {
                user: null,
                role: null,
                token: null,
                loading: false,
                error: null
            }
        case 'LOGOUT':
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            return {
                user: null,
                role: null,
                token: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state)

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user))
        }
        if (state.token) {
            localStorage.setItem('token', state.token)
        }
    }, [state.user, state.token])

    return (
        <AuthContext.Provider value={{
            user: state.user,
            role: state.role,
            token: state.token,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}
