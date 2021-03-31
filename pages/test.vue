<template>
  <div class="w-full relative">
    <input type="range" min="1" max="100" value="50" class="slider">
  </div>
</template>

<script>
export default {
  mounted(){
    if(!this.$auth.loggedIn){
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style>

input[type='range'] {
  overflow: hidden;
  width: 80px;
  -webkit-appearance: none;
  background-color: #F3F4F6;
}

input[type=range]:focus {
  outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 10px;
  -webkit-appearance: none;
  color: #13bba4;
  margin-top: -1px;
}

input[type='range']::-webkit-slider-thumb {
  width: 15px;
  -webkit-appearance: none;
  height: 15px;
  cursor: pointer;
  background: #10B981;
  border-radius: 50%;
  box-shadow: -80px 0 0 80px #34D399;
}

input[type="range"]::-moz-range-progress {
  background-color: #43e5f7;
}

input[type="range"]::-moz-range-track {
  background-color: #9a905d;
}

input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7;
}

input[type="range"]::-ms-fill-upper {
  background-color: #9a905d;
}
</style>
