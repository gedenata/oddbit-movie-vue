<template>
  <transition name="fade">
    <div
      class="overlay"
      v-if="isLoading"
      :class="{ 'overlay--active': isLoading, 'overlay--relative': isRelative }"
      @click="isLoading = !isLoading"
    >
      <div class="spinner">
        <span
          v-for="item in items"
          v-bind:key="item.id"
          :class="item"
          :style="{ 'background-color': $props.color }"
        ></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "spinner",
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#636e72"
    },
    isRelative: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    items: ["one", "two", "three"]
  })
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  position: fixed;
  pointer-events: none;
  align-content: center;
  justify-content: center;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  &--relative {
    height: 100px;
    margin-top: -100px;
    position: relative;
  }

  &--active {
    pointer-events: auto;
    touch-action: none;

    &:before {
      opacity: 1;
    }
  }

  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: inherit;
    transition-delay: 150ms;
    background-color: #ffffff;
    content: "";
  }
}

.spinner {
  display: flex;
  font-size: 26px;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;

  > span {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 50%;
    display: inline-block;
    animation: bouncedelay 1.4s infinite ease-in-out both;

    &.one {
      animation-delay: -0.32s;
    }
    &.two {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
