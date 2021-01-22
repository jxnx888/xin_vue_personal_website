<template>
  <div class="snowMeteor">

  </div>
</template>

<script>
  import {Snows} from './snowMeteor.js'
    export default {
        name: "snowMeteor",
        methods: {
            runSnow() {
                // eslint-disable-next-line no-undef
                new Snows({
                    isRain: true,
                    num: 100,
                    maxSpeed: 15
                })
                new Snows({
                    isRain: false,
                    num: 50
                })
            },
            stopSnow(){
                $(".snowObjs").remove();
            }
        },
        mounted() {
            this.runSnow()
        },
        activated() {
            this.runSnow()
        },
        destroyed() {
            this.stopSnow();
        },
        deactivated() {
          this.stopSnow();
        }
    }
</script>

<style scoped>

</style>
