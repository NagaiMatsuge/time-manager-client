import axios from "axios";

export default {
    state: {
        info: null,
        info_project: null,
        payments: null,
        info_user: null
    },
    mutations: {
        setInfoProject(state, info) {
            state.info = info;
        },
        setProjectInfo(state, info_project) {
            state.info_project = info_project;
        },
        setPayments(state, payments) {
            state.payments = payments;
        },
        setInfoUser(state, info_user) {
            state.info_user = info_user;
        },
    },
    actions: {
        async fetchInfoProject({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const project = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/create`))
                .data;
            commit("removeProgress");

            if (project.success) {
                commit("setInfoProject", project.data);
            } else {
                commit("setError", project.message);
                throw project.message
            }
        },
        async fetchProjectInfo({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const project = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/${id}/steps`))
                .data;
            commit("removeProgress");

            if (project.success) {
                commit("setProjectInfo", project.data);
            } else {
                commit("setError", project.message);
                throw project.message
            }
        },
        async fetchProjectPayments({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const project = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/${id}/payments`))
                .data;
            commit("removeProgress");

            if (project.success) {
                commit("setPayments", project);
            } else {
                commit("setError", project.message);
                throw project.message
            }
        },
        async fetchInfoUser({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const InfoUser = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks/users`))
                .data;
            commit("removeProgress");

            if (InfoUser.success) {
                commit("setInfoUser", InfoUser.data);
            } else {
                commit("setError", InfoUser.message);
                throw InfoUser.message
            }
        },

    },
    getters: {
        getInfoProject: (s) => s.info,
        getProjectInfo: (s) => s.info_project,
        getPayments: (s) => s.payments,
        getInfoUser: (s) => s.info_user
    },
};
