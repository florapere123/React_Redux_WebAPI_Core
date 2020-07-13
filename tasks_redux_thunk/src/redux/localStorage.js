export const saveState = (state) => {
     if (state && state.tasks && state.tasks.length !== 0) {
        localStorage.setItem('state', JSON.stringify(state))
    }
}

export const getState = () => {
    console.log('get unitial state!!!')
    try {
        const s = localStorage.getItem('state')
        console.log('Getting state, ', s)
        if (s === null) return undefined
        return JSON.parse(s)
    } catch (e) {
        return undefined
    }
}
