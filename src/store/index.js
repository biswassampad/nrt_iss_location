import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getIssLocation } from './actions';

export default new Vuex.Store({
    state: {
        currentLocation: {},
        sessionLocations: []
    },
    mutations: {
        setCurrentLocation(state, payload) {
            state.currentLocation = payload
        },
        insertToLocations(state, payload) {
            state.sessionLocations.push(payload)
        }
    },
    actions: {
        async setCurrentLocation(state) {
            let location = await getIssLocation();
            if (location) {
                state.commit('setCurrentLocation', location);
                state.commit('insertToLocations', location);
            }
        }
    },
    modules: {},
    getters: {
        getCurrentLocation: state => state.currentLocation,
        getAllLocations: state => state.sessionLocations
    }
})