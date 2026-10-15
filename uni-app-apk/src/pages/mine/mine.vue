<template>
  <view class="mine-page">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="user-row">
        <view class="avatar">工</view>
        <view class="user-info">
          <text class="username">{{ account }}</text>
          <text class="user-tag">ID 10086 · 普通用户</text>
        </view>
        <text class="settings" @click="onStub('设置')">设置</text>
      </view>

      <view class="stats">
        <view class="stat-item" v-for="s in stats" :key="s.label" @click="onStub(s.label)">
          <text class="stat-num">{{ s.value }}</text>
          <text class="stat-label">{{ s.label }}</text>
        </view>
      </view>
    </view>

    <!-- 工具 -->
    <view class="section">
      <view class="section-hd">
        <text class="section-title">我的工具</text>
      </view>
      <view class="cell" v-for="c in toolCells" :key="c.label" @click="onCell(c)">
        <view class="cell-icon" :style="{ background: c.bg }">{{ c.icon }}</view>
        <text class="cell-label">{{ c.label }}</text>
        <text class="cell-value">{{ c.value }}</text>
        <text class="cell-arrow">›</text>
      </view>
    </view>

    <!-- 通用 -->
    <view class="section">
      <view class="section-hd">
        <text class="section-title">通用</text>
      </view>
      <view class="cell" v-for="c in commonCells" :key="c.label" @click="onCell(c)">
        <view class="cell-icon" :style="{ background: c.bg }">{{ c.icon }}</view>
        <text class="cell-label">{{ c.label }}</text>
        <text class="cell-value">{{ c.value }}</text>
        <text class="cell-arrow">›</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-btn" @click="handleLogout">退出登录</view>

    <custom-tabbar current="/pages/mine/mine" />
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      account: 'admin',
      stats: [
        { label: '收藏', value: '3' },
        { label: '最近使用', value: '12' },
        { label: '累计使用', value: '486' },
        { label: '今日', value: '7' },
      ],
      toolCells: [
        { label: '我的收藏', icon: '藏', value: '3 个', bg: 'linear-gradient(135deg, #35d3b6, #00b4e6)', action: 'favorites' },
        { label: '使用记录', icon: '记', value: '', bg: 'linear-gradient(135deg, #56ccf2, #7b61ff)' },
        { label: '工具管理', icon: '管', value: '', bg: 'linear-gradient(135deg, #7b61ff, #a78bfa)' },
      ],
      commonCells: [
        { label: '清理缓存', icon: '清', value: '12.4 MB', bg: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
        { label: '检查更新', icon: '新', value: 'v1.0.0', bg: 'linear-gradient(135deg, #f472b6, #fb7185)' },
        { label: '意见反馈', icon: '反', value: '', bg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
        { label: '关于工具箱', icon: '关', value: '', bg: 'linear-gradient(135deg, #8a919f, #b0b6c3)' },
      ],
    }
  },
  onShow() {
    if (!getToken()) {
      uni.reLaunch({ url: '/pages/login/login' })
      return
    }
    this.account = uni.getStorageSync('account') || 'admin'
  },
  methods: {
    onCell(c) {
      if (c.action === 'favorites') {
        uni.switchTab({ url: '/pages/favorites/favorites' })
        return
      }
      uni.showToast({ title: `${c.label}：敬请期待`, icon: 'none' })
    },
    onStub(name) {
      uni.showToast({ title: `${name}：敬请期待`, icon: 'none' })
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.clearStorageSync()
            uni.reLaunch({ url: '/pages/login/login' })
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$brand: #00a394;

.mine-page {
  min-height: 100vh;
  background: #f4fbfc;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.user-header {
  padding: 50rpx 30rpx 40rpx;
  background: linear-gradient(160deg, #35d3b6, #00b4e6);
  border-radius: 0 0 40rpx 40rpx;
}

.user-row {
  display: flex;
  align-items: center;
}

.avatar {
  width: 110rpx;
  height: 110rpx;
  line-height: 110rpx;
  text-align: center;
  font-size: 48rpx;
  font-weight: 700;
  color: $brand;
  background: #fff;
  border-radius: 50%;
}

.user-info {
  flex: 1;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 36rpx;
  font-weight: 700;
  color: #fff;
}

.user-tag {
  margin-top: 10rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.85);
}

.settings {
  font-size: 24rpx;
  color: #fff;
  padding: 10rpx 24rpx;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999rpx;
}

.stats {
  display: flex;
  margin-top: 40rpx;
  padding: 26rpx 0;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 32rpx;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.85);
}

.section {
  margin: 24rpx;
  padding: 28rpx 0 8rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 24rpx rgba(6, 179, 199, 0.06);
}

.section-hd {
  padding: 0 28rpx;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2329;
}

.cell {
  display: flex;
  align-items: center;
  padding: 22rpx 28rpx;
}

.cell-icon {
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  border-radius: 18rpx;
  flex-shrink: 0;
}

.cell-label {
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #1f2329;
}

.cell-value {
  flex: 1;
  text-align: right;
  font-size: 24rpx;
  color: #9aa5b1;
}

.cell-arrow {
  margin-left: 12rpx;
  font-size: 32rpx;
  color: #c4cad6;
}

.logout-btn {
  margin: 30rpx 24rpx 0;
  height: 92rpx;
  line-height: 92rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 600;
  color: #ff5d5d;
  background: #fff;
  border-radius: 999rpx;
  border: 2rpx solid rgba(255, 93, 93, 0.45);
}
</style>
