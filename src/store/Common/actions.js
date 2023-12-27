
export const LOADING = 'LOADING'


export const getUserInfo = (flag) => (dispatch) => {
    dispatch({
        type: LOADING,
        payload: flag
    })
}
