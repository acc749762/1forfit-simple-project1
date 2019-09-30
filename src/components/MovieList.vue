<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item
                v-for="movie in filteredMovies"
                :key="movie.id"
                :movie="movie.movie"
            >
                <div class="movie-sessions">
                    <div
                        v-for="session in filteredSessions(movie.sessions)"
                        :key="session.id"
                        class="session-time-wrapper"
                    >
                        <div class="session-time">{{ formatSessionTime(session.time)}}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div
            v-else-if="movies.length"
            class="no-results"
        >{{noResults}}</div>
        <div
            v-else
            class="no-results"
        >Loading...</div>

    </div>
</template>

<script>
import genres from "../util/genres";
import times from "../util/times";

import MovieItem from "./MovieItem.vue";
import { log } from "util";

export default {
    data: function() {
        return {};
    },
    props: ["genre", "time", "movies", "day"],
    methods: {
        moviePassesGenreFilter(m) {
            if (!this.genre.length) {
                return true;
            }

            let movieGenres = m.movie.Genre.split(", ");
            let matched = true;
            this.genre.forEach(g => {
                if (movieGenres.indexOf(g) === -1) {
                    matched = false;
                }
            });

            return matched;
        },
        sessionPassesTimeFilter(s) {
            if (!this.day.isSame(this.$moment(s.time), "day")) {
                return false;
            } else if (this.time.length === 0 || this.time.length === 2) {
                return true;
            } else if (this.time[0] === times.AFTER_6PM) {
                return this.$moment(s.time).hour() >= 18;
            } else {
                return this.$moment(s.time).hour() <= 18;
            }
        },

        formatSessionTime(time) {
            return this.$moment(time).format("h:mm A");
        },
        filteredSessions(sessions) {
            return sessions.filter(this.sessionPassesTimeFilter);
        }
    },
    computed: {
        filteredMovies() {
            return this.movies
                .filter(this.moviePassesGenreFilter)
                .filter(movie =>
                    movie.sessions.find(this.sessionPassesTimeFilter)
                );
        },
        noResults() {
            let times = this.time.join(", ");
            let genres = this.genre.join(", ");
            return `No results for ${times}, ${genres}`;
        }
    },
    components: {
        MovieItem
    }
};
</script>

<style>
</style>