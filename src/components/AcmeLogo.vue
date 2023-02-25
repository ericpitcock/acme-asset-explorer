<template>
  <div :class="['logo', { 'logo--icon': type == 'icon' }]">
    <svg
      id="a"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="76.91"
      height="18"
      viewBox="0 0 76.91 18"
    >
      <template v-if="type === 'icon'">
        <path
          style="fill: currentcolor"
          d="m5.17.3L0,17.7h3.01l1.25-4.34h4.82l1.25,4.34h3.06L8.22.3h-3.05Zm3.14,10.32h-3.28l1.64-5.75,1.64,5.75Z"
        />
      </template>
      <template v-else>
        <path
          style="fill: currentcolor"
          d="m5.17.3L0,17.7h3.01l1.25-4.34h4.82l1.25,4.34h3.06L8.22.3h-3.05Zm3.14,10.32h-3.28l1.64-5.75,1.64,5.75Z"
        />
        <path
          style="fill: currentcolor"
          d="m20.32,9c0,5.48,1.67,6.18,3.12,6.18,1.12,0,2.46-.39,2.92-3.39l.06-.4h3.04l-.07.54c-.56,4.08-2.5,6.07-5.95,6.07-4.18,0-6.13-2.86-6.13-9S19.25,0,23.44,0c3.45,0,5.4,1.99,5.95,6.07l.07.54h-3.04l-.06-.4c-.47-3-1.81-3.39-2.92-3.39-1.45,0-3.12.7-3.12,6.18Z"
        />
        <polygon
          style="fill: currentcolor"
          points="42.36 .3 45.44 .3 45.44 17.7 42.7 17.7 42.7 6.74 40.4 13.54 38.72 13.54 36.42 6.74 36.42 17.7 33.73 17.7 33.73 .3 36.83 .3 39.6 8.48 42.36 .3"
        />
        <polygon
          style="fill: currentcolor"
          points="51.32 .3 62.09 .3 62.09 3.04 54.26 3.04 54.26 7.36 60.59 7.36 60.59 10.1 54.26 10.1 54.26 14.96 62.09 14.96 62.09 17.7 51.32 17.7 51.32 .3"
        />
        <path
          style="fill: currentcolor"
          d="m72.48,0c-2.53,0-4.44,1.89-4.44,4.39s1.91,4.39,4.44,4.39,4.44-1.89,4.44-4.39-1.91-4.39-4.44-4.39Zm1.64,4.39c0,1.04-.68,1.77-1.64,1.77s-1.65-.73-1.65-1.77.68-1.77,1.65-1.77,1.64.73,1.64,1.77Z"
        />
    </template>
  </svg>
</div></template>

<script>
export default {
  name: 'AcmeLogo',
  props: ['type']
}
</script>

<style lang="scss">svg {
  display: block;
}

.logo {
  padding-left: 3px;

  &--icon {
    width: 13.3867px;
    padding-left: 0;
  }
}</style>