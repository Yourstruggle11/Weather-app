<template>
<div>
  <!-- <h1>hello world</h1> -->
<Weather /> 

<Style />
</div>
</template>
  

<script>
//importing style
import Style from './components/Styles' 
//importing components
import Weather from './components/Weather'
export default {
  name: "app",
    components: {
    Weather,
    Style
  },
};


</script>