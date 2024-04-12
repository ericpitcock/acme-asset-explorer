<template>
  <div
    class="in-spark-bar"
    :style="{ width: `${bar[5]}%` }"
  >
    <div
      v-for="(segment, index) in segmentWidth"
      :key="index"
      class="in-spark-bar__segment"
      :style="{ width: `${segment}%` }"
    >
      <span class="in-spark-bar__segment__info">
        {{ segmentHoverInfo(index) }}
      </span>
    </div>
    <p class="in-spark-bar__label font-size--tiny">
      {{ bar[4] }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'InSparkBar',
    props: {
      bar: {
        // value is an array that consists of [low, medium, high, critical, sum, percentage (of largest vuln total)]
        type: Array,
        required: true
      }
    },
    computed: {
      // return the first four in this.bar array
      // and the sum of the rest
      segments() {
        return this.bar.slice(0, 4)
      },
      // return percentage of the sum for each segment
      // to be used as width
      segmentWidth() {
        const sum = this.bar.slice(4).reduce((acc, curr) => {
          return acc + curr
        }, 0)
        return this.bar.slice(0, 4).map((segment) => {
          return (segment / sum) * 100
        })
      }
    },
    methods: {
      segmentHoverInfo(index) {
        switch (index) {
          case 0:
            return `${this.segments[index]} low vulnerabilities`
          case 1:
            return `${this.segments[index]} medium vulnerabilities`
          case 2:
            return `${this.segments[index]} high vulnerabilities`
          case 3:
            return `${this.segments[index]} critical vulnerabilities`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .in-spark-bar {
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;
    height: 0.8rem;
    transition: transform 0.2s ease-in-out;
    transform-origin: left 50%;

    &:hover {
      position: relative;
      background-color: var(--interface--surface);
      transform: scale(4);
      gap: 0.5px;
      z-index: var(--z-index--tooltip);

      .in-spark-bar__label {
        transform: scale(0.25, 0.25);
        transform-origin: left;
        font-size: var(--font-size--tiny);
        opacity: 1;
        margin-left: 0.2rem;
      }

      .in-spark-bar__segment {
        border-radius: 0;
      }

      & > .in-spark-bar__segment:not(:hover) {
        opacity: 0.5;
      }
    }

    &__segment {
      position: relative;
      height: 100%;
      min-width: 0.1rem;

      .in-spark-bar__segment__info {
        position: absolute;
        top: -120%;
        transform: scale(0.25, 0.25);
        transform-origin: left top;
        display: none;
        padding: 0.4rem 0.6rem;
        background: var(--interface-overlay);
        border: 1px solid var(--border-color--lighter);
        border-radius: var(--border-radius);
        font-size: var(--font-size--tiny);
        z-index: var(--z-index--tooltip);
        white-space: normal;
      }

      &:hover > .in-spark-bar__segment__info {
        display: block;
      }

      &:nth-child(1) {
        background-color: var(--bg-color--alert-low);
        border-radius: 0.4rem 0 0 0.4rem;
      }

      &:nth-child(2) {
        background-color: var(--bg-color--alert-medium);
      }

      &:nth-child(3) {
        background-color: var(--bg-color--alert-high);
      }

      &:nth-child(4) {
        background-color: var(--bg-color--alert-critical);
        border-radius: 0 0.4rem 0.4rem 0;
      }
    }

    &__label {
      margin-left: 0.5rem;
    }
  }
</style>
