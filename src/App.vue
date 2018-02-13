<template>
    <div class="app" v-bind:class="{ 'app--notification': isComplete }">
        <main class="timer">
            <h1 class="timer__title">POMODORO TIMER</h1>
            <p class="timer__countdown">{{ countdown }}</p>
            <button class="btn btn--start" v-on:click="start" :disabled="isActive || isComplete">START</button>
            <button class="btn btn--stop" v-on:click="stop" :disabled="!isActive">STOP</button>
            <button class="btn btn--reset" v-on:click="reset" :disabled="isReset">RESET</button>
        </main>
    </div>
</template>

<script>
    import NotificationSound from './assets/sounds/notification';
    import { requestNotificationPermission, showNotification } from './sw-helpers';

    const notificationSound = new Audio(NotificationSound);
    const padNum = num => `0${ num }`.slice(-2);
    let countdownInterval;

    export default {
        name: 'App',
        data () {
            return {
                isActive: false,
                isReset: true,
                isComplete: false,
                minutes: 25,
                seconds: 0
            }
        },
        computed: {
            countdown() {
                return `${ padNum(this.minutes) }:${ padNum(this.seconds) }`;
            }
        },
        methods: {
            start() {
                this.isActive = true;
                this.isReset = false;
                requestNotificationPermission();

                countdownInterval = setInterval(() => {
                    if (this.seconds > 0) {
                        this.seconds--;

                        if (this.minutes === 0 && this.seconds === 0) {
                            clearInterval(countdownInterval);
                            this.isActive = false;
                            this.isComplete = true;

                            if (document.hidden) {
                                showNotification();
                                return;
                            }

                            notificationSound.play()
                                .catch(error => console.error(error));
                        }

                        return;
                    }

                    this.seconds = 59;
                    this.minutes--;
                }, 1000);
            },

            stop() {
                clearInterval(countdownInterval);
                this.isActive = false;
            },

            reset() {
                clearInterval(countdownInterval);
                this.minutes = 25;
                this.seconds = 0;
                this.isActive = false;
                this.isReset = true;
                this.isComplete = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'Roboto';
        font-weight: 100;
        src: local('Roboto Thin'), local('Roboto-Thin'), url('./assets/fonts/roboto-thin.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
    }

    .app {
        position: relative;
        height:100%;
        background-color: #222222;
    }

    @keyframes app-notification {
        50% {
            background-color: #ffffff;
        }
        100% {
            background-color: #222222;
        }
    }

    .app--notification {
        animation-name: app-notification;
        animation-duration: 4s;
    }

    .timer {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        font-family: 'Roboto', sans-serif;
        text-align: center;
    }

    @mixin orientation-font-size($orientation, $font-size) {
        @media screen and (orientation: $orientation) {
            font-size: $font-size;
        }
    }

    @mixin timer-text($color, $font-size) {
        margin: 0;
        color: $color;
        cursor: default;
        @include orientation-font-size(portrait, $font-size + vw);
        @include orientation-font-size(landscape, $font-size + vh);
    }

    .timer__title {
        @include timer-text(#666666, 6);
    }

    .timer__countdown {
        @include timer-text(#dddddd, 37);
    }

    .btn {
        font-family: 'Roboto', sans-serif;
        color: #ffffff;
        border-style: solid;
        border-width: 1px;
        outline: 0;
        cursor: pointer;

        &:disabled {
            background-color: transparent;
            cursor: default;
        }

        @mixin btn-viewport-sizing($unit) {
            width: 25 + $unit;
            padding: 4 + $unit 0;
            margin: 0 1.5 + $unit;
            font-size: 5 + $unit;
        }

        @media screen and (orientation: portrait) {
            @include btn-viewport-sizing(vw);
        }

        @media screen and (orientation: landscape) {
            @include btn-viewport-sizing(vh);
        }
    }

    @mixin btn-theme($color) {
        background-color: $color;
        border-color: $color;

        &:disabled {
            color: $color;
        }
    }

    .btn--start {
        @include btn-theme(#00bc8c);
    }

    .btn--stop {
        @include btn-theme(#e74c3c);
    }

    .btn--reset {
        @include btn-theme(#3498db);
    }
</style>
