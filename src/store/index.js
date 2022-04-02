import {createStore} from 'vuex'

const store = createStore({
    state: {
        menu: [
            {
                powerId: "1",
                powerName: "工作台",
                powerPid: undefined,
                powerUrl: "/workbench",
            },
        
        ],
        user:{},
    }
})
export default store