<template>
  <div class="rank-head container" :style="cStyle" id="transparent-header">
    <a class="rank-head-back" @click="routerBack"></a>
    {{title}}
  </div>
</template>

<script type="es6">
  export default {
    props: ['title', 'to', 'cStyle'],
    methods: {
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
