<template>
  <slot name="header"/>
  <div class="flex">
    <slot name="chat"/>

    <div class="w-full mt-20">
      <slot/>
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts">
</script>
