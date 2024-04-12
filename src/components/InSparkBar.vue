<template>
  <div class="in-spark-bar-container">
    <div
      class="in-spark-bar"
      :style="{ width: `${bar[5]}%` }"
    >
      <div
        v-for="(segment, index) in segmentWidth"
        :key="index"
        class="in-spark-bar__segment"
        :style="{ flex: `0 0 ${segment}%` }"
      >
        <span class="in-spark-bar__segment__info">
          {{ segmentHoverInfo(index) }}
        </span>
      </div>
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
        // value is an array of numbers
        // [low, medium, high, critical, sum, percentage (of largest vuln total)]
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
        const sum = this.bar[4]

        return this.bar.slice(0, 4).map((segment) => {
          return (segment / sum) * 100
        })
      }
    },
    methods: {
      segmentHoverInfo(index) {
        switch (index) {
          case 0:
            return `${this.segments[index]} Low Vulnerabilities`
          case 1:
            return `${this.segments[index]} Medium Vulnerabilities`
          case 2:
            return `${this.segments[index]} High Vulnerabilities`
          case 3:
            return `${this.segments[index]} Critical Vulnerabilities`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .in-spark-bar-container {
    display: flex;
    align-items: center;
    // gap: 1rem;
  }

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
      transform: scale(4);
      gap: calc(2px / 4);
      z-index: var(--z-index--tooltip);

      .in-spark-bar__label {
        transform: scale(0.25, 0.25);
        transform-origin: left;
        font-size: var(--font-size--tiny);
        opacity: 1;
        margin-left: 0.2rem;
      }
    }

    &__segment {
      position: relative;
      height: 100%;
      min-width: 0.1rem;

      .in-spark-bar__segment__info {
        position: absolute;
        top: -130%;
        transform: scale(0.25, 0.25);
        transform-origin: left top;
        display: none;
        padding: 0.4rem 0.6rem;
        background: var(--interface-overlay);
        border: 1px solid var(--border-color--lighter);
        border-radius: var(--border-radius);
        font-size: var(--font-size--small);
        color: var(--text-color--loud);
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
      margin-left: 2rem;
    }
  }
</style>
