<template>
  <div class="user-wrapper">
    <div class="content-box" style="min-width: 300px; height: 100%; justify-content: space-between;">
      <app-selector />
      <notice-icon class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- 在此处更换头像 -->
          <a-avatar icon="user" style="margin:20px 8px 20px 0;" />
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ path: `/${appCode}${settingPath}` }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ path: `/${appCode}${notificationPath}` }">
              <a-icon type="message" />
              <span>消息通知</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="2">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import AppSelector from '../tools/AppSelector'
import { iopAuthService, iopAppService } from '@/iop/service/index'
import { settingPath, notificationPath } from '@/config/router'
import MessageUtils from '@/utils/message'

export default {
  name: 'UserMenu',
  data () {
    return {
      nickname: '',
      appCode: '',
      settingPath,
      notificationPath
    }
  },
  components: {
    NoticeIcon,
    AppSelector
  },
  created () {
    this.appCode = iopAppService.getCurrentAppCode()
    iopAuthService.getNickname()
      .then(name => { this.nickname = name })
      .catch(err => MessageUtils.error(err))
  },
  methods: {
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '确定要注销登录吗 ?',
        onOk: async () => {
          await iopAuthService.logout()
        }
      })
    }
  }
}
</script>
