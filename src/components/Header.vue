<script setup>

</script>

<template>
  <div class="flex text-4xl font-bold  p-4">
    <!--Logo -->
    <div class="mr-4">
      <slot name="logo">
        <img src="../components/icons/_ (1).jpeg" alt="" width="150px" height="50px">
      </slot>
    </div>
    <div class="flex flex-col">
      <!--Main title-->
      <div class="flex flex-col">
        <h3 class="text-blue-900">
          <slot name="Maintitle">Main title </slot>
        </h3>
      </div>

      <!--Subtitle--->
      <div class="">
        <h5 class="text-green-300">
          <slot name="Subtitle"> Subtitle</slot>
        </h5>
      </div>

    </div>



  </div>

</template>

<style scoped></style>