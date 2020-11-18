<template>
  <div class="log">
    <div class="main">
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item style="margin-top: 6.9%;height: 100%;">
          <a-input
            size="large"
            type="text"
            placeholder="请输入帐户名"
            style="width: 80%;height:57px;text-align:left;"
            v-decorator="[
              'loginName',
              {rules: [{ required: true, whitespace: true, message: '请输入帐户名' }], validateTrigger: 'change'}
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            style="width: 80%;height:57px;margin-top:3%"
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {rules: [{ required: true, whitespace: true, message: '请输入密码' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
        <a-form-item style="width:80%;margin:0 auto;margin-top:3%">
          <a-input
            size="large"
            type="text"
            placeholder="请输入验证码"
            style="width:55%;height:57px;margin-right:2%;"
            v-decorator="[
              'captcha',
              {rules: [{ required: true, whitespace: true, message: '请输入验证码' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="safety" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
          <span style="font-size:16px;float:right;width:42%">
            <img @click="refreshCaptcha()" style="height: 57px;width:100%" :src="image" />
          </span>
        </a-form-item>
        <a-form-item style="margin-top:11%;margin-bottom:5%;">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            style="width: 80%;height:57px;font-size:30px"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >登录</a-button>
        </a-form-item>
        <div id="userLayout" :class="['user-layout-wrapper']" style="margin-bottom:5%">
          <div class="container">
            <div class="footer">
              <div class="links">
                <a href="#">版本更新</a>
                <a href="#">开放平台</a>
                <a href="#">关于我们</a>
                <a href="#">联系我们</a>
              </div>
              <div class="copyright">
                <a-icon type="copyright" />
                <span>互联开放式应用支撑平台</span>
              </div>
            </div>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { timeFix } from '@/utils/util'
import { iopAuthService, iopTokenService, iopAppService } from '@/iop/service/index'
import url from '@/iop/api'

export default {
  name: 'Login',
  data () {
    return {
      loginBtn: false,
      image: url.auth.captcha,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      },
      captcha: url.auth.captcha,
      company: ''
    }
  },
  created () {
    iopTokenService.clean()
    iopAppService.clean()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this
      state.loginBtn = true
      const validateFieldsKey = ['loginName', 'password', 'captcha']
      validateFields(validateFieldsKey, { force: true }, async (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          /** 默认登录的系统 */
          loginParams.appCode = iopAppService.getDefaultAppCode()
          try {
            await iopAuthService.login(loginParams)
            setTimeout(() => {
              this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`
              })
            }, 1000)
          } catch (error) {
            console.error('login error', error)
            this.requestFailed(error)
          } finally {
            state.loginBtn = false
          }
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    requestFailed (message) {
      this.$notification['error']({
        message: '错误',
        description: message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.refreshCaptcha()
    },
    refreshCaptcha () {
      this.image = `${url.auth.captcha}?${new Date().getTime()}`
    }
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    padding: 5px 0 0;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .right {
      // background-image: url(~@/assets/login/bjk_3.png);
      // background-size: 100% 100%;
      background: rgba(79,186,252,0.20);
      position: absolute;
      top: 0;
      right: 0;
      width: 35%;
      height: 100%;
      display: flex;
    }
    @media screen and (max-width: 1366px){
      .main {
        width: 25%;
        position: absolute;
        right: 13%;
        top: 22%;
        overflow: hidden;
        margin: auto;
        border-radius: 8px;
        background: rgba(79,186,252,0.20);
        float: right;
      }
    }
    @media screen and (max-width: 4096px){
      .main {
        width: 26%;
        position: absolute;
        right: 13%;
        top: 22%;
        overflow: hidden;
        margin: auto;
        border-radius: 8px;
        background: rgba(79,186,252,0.20);
        float: right;
      }
    }
    @media screen and (max-width: 1440px){
      .main {
        width: 26%;
        position: absolute;
        right: 13%;
        top: 22%;
        overflow: hidden;
        margin: auto;
        border-radius: 8px;
        background: rgba(79,186,252,0.20);
        float: right;
      }
    }
    @media screen and (max-width: 1024px){
      .main {
        width: 35%;
        position: absolute;
        right: 4%;
        top: 25%;
        overflow: hidden;
        margin: auto;
        border-radius: 8px;
        background: rgba(79,186,252,0.20);
        float: right;
      }
    }
    .main > .ant-form {
      padding: 4.1% 2.6%;
      text-align: center;
    }
    .ant-form-item {
      margin-bottom: 0;
    }

    .footer {
      width: 80%;
      bottom: 0;
      padding: 0 16px;
      margin: 0 auto;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 12px;
        a {
          color: #fff;
          opacity: 0.6;
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 4%;
          }
        }
      }
      .copyright {
        color: #fff;
        font-size: 12px;
        opacity: 0.6;
      }
    }
  }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    margin: 0;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #157cc9;
      }
    }
  }
}
</style>
