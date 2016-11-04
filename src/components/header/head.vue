<template>
  <div class="header">
    <headLogo></headLogo>
    <head-nav></head-nav>
  </div>
</template>

<script type="es6">
  import headLogo from './head_logo';
  import headNav from './head_nav'
  export default {
    name:'k-head',
    components:{headLogo,headNav}
  }
</script>
