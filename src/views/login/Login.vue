<template>
  <div class="ep-login">
    <ep-container
      width="400px"
      contentPadding="0 3rem 6rem 3rem"
      style="box-shadow: var(--drop-shadow);"
    >
      <template #header>
        <div class="ep-login__header">
          <acme-logo />
        </div>
      </template>
      <div class="ep-login__form">
        <form @submit.prevent="login">
          <ep-input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            background-color="var(--interface-foreground)"
          />
          <ep-input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            background-color="var(--interface-foreground)"
          />
          <ep-button
            type="submit"
            label="Sign In"
            kind="primary"
          />
        </form>
      </div>
      <template #footer>
        <div class="ep-login__footer">
          <p class="text--subtle">You can just click Sign In :-)</p>
        </div>
      </template>
    </ep-container>
  </div>
</template>

<script>
  import AcmeLogo from '@/components/AcmeLogo.vue'

  export default {
    name: 'EpAcmeAssetExplorerLogin',
    components: {
      AcmeLogo
    },
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        // this.$store.dispatch('auth/login', {
        //   email: this.email,
        //   password: this.password,
        // })
        // send to route /
        this.$router.push('/')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ep-login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: var(--background-1);
    // a beautiful gradient with purples and blues
    // background: linear-gradient(135deg, #5f2c82, #49a09d);
    // that but darker
    background: linear-gradient(135deg, #3d0c40, #2a7e5b);
    // because I'm faking the login view as essentially a modal
    z-index: var(--z-index--modal);

    // give it one more step in between to smooth it out
    // background: linear-gradient(135deg, #310c40, #2a7e5b, #1d93b4);
    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6rem;
      // background: green;
    }

    &__form {
      display: flex;
      flex-direction: column;

      // justify-content: center;
      // align-items: center;
      // background: red;
      & > form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > * + * {
          margin-top: 2rem;
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--border-color);
      padding: 2rem;
    }
  }
</style>