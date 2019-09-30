<template>
    <div id="day-select">
        <ul class="days">
            <li
                :class="{day: true, active: isActive(day)}"
                v-for="day in days"
                :key="day"
                @click="selectDay(day)"
            >{{formatDay(day)}}</li>
            <li class="day-selector">
                <span
                    class="dec"
                    @click="changeDay(-1)"
                ></span>
                <span
                    class="inc"
                    @click="changeDay(1)"
                ></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["selected"],
    data() {
        return {
            days: [0, 1, 2, 3, 4, 5, 6].map(d => this.$moment().add(d, "days"))
        };
    },
    methods: {
        formatDay(day) {
            return day.format("ddd DD/MM");
        },
        isActive(day) {
            return day.isSame(this.selected, "day");
        },
        selectDay(day) {
            this.$bus.$emit("set-day", day);
        },
        changeDay(step) {
            let newDay = this.$moment(this.selected).add(step, "days");
            if (this.days.find(d => newDay.isSame(d, "day"))) {
                this.selectDay(newDay);
            }
        }
    }
};
</script>

<style>
</style>