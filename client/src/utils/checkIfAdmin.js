
export const checkIfItsAdmin = async (user, setIsAdmin, dispatch) => {
    if (user[0]?.role === 'admin') {
        console.log('------', user);

        dispatch(setIsAdmin(true))
    } else {
        dispatch(setIsAdmin(false))
    }

}