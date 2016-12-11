<template>
  <div class="rank-head container" :style="style" id="transparent-header">
    <a class="rank-head-back" @click="routerBack"></a>
    {{title}}
  </div>
</template>

<script type="es6">
  export default {
    props: ['title', 'to', 'style'],
    name: 'rank-head',
    methods: {
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
