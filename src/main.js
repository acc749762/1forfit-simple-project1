import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import moment from 'moment-timezone';

import './style.scss';
import { checkFilter, setDay } from './util/bus';
import routes from './util/routes';

Vue.use(VueResource);
Vue.use(VueRouter);

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
    get() {
        return this.$root.moment;
    }
});

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    data: function() {
        return {
            genre: [],
            time: [],
            movies: [],
            moment,
            day: moment(),
            bus
        };
    },
    components: {},
    created() {
        this.$http.get('/api').then(resp => {
            this.movies = resp.data;
        });

        this.$bus.$on('check-filter', checkFilter.bind(this));

        this.$bus.$on('set-day', setDay.bind(this));
    }
});
