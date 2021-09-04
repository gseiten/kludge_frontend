import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
const codeSnippet = require('../constants/code_snippets.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        // * Logged in user.
        loggedInUser: null,
        // * Some default starting values are given.
        code: codeSnippet.js,
        selectedLanguage: "JavaScript",
        selectedMenuOption: "profile",
        isLayoutVertical: true,
        selectedPostType: "Questions",
    },
    mutations: {
        setLoggedInUser(state, user) {
            state.loggedInUser = user;
        },
        holdTheCode(state, code) {
            state.code = code;
        },
        changeSelectedLanguage(state, language) {
            state.selectedLanguage = language;
        },
        changeSelectedMenuOption(state, option) {
            state.selectedMenuOption = option;
        },
        switchSplitpanesLayout(state, option) {
            state.isLayoutVertical = option;
        },
        changePostType(state, type) {
            state.selectedPostType = type;
        }
    },
    getters: {
        loggedInUser: state => state.loggedInUser,
        code: state => state.code,
        selectedLanguage: state => state.selectedLanguage,
        selectedMenuOption: state => state.selectedMenuOption,
        isLayoutVertical: state => state.isLayoutVertical,
        selectedPostType: state => state.selectedPostType
    }
});