
export const checkIfItsAdmin = async (user, setIsAdmin, dispatch) => {
    if (user[0]?.role === 'admin') {

        dispatch(setIsAdmin(true))
    } else {
        dispatch(setIsAdmin(false))
    }

}