<template>
  <view class="login-page">
    <view class="brand">
      <view class="logo">工</view>
      <view class="brand-name">工具箱</view>
      <view class="brand-slogan">轻巧 · 全能 · 免费</view>
    </view>

    <view class="login-card">
      <view class="card-tabs">
        <text class="tab active">账号登录</text>
        <text class="tab">手机登录</text>
      </view>

      <view class="form-item">
        <input
          v-model="account"
          class="form-input"
          type="text"
          placeholder="请输入账号"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <input
          v-model="password"
          class="form-input"
          type="password"
          :password="true"
          placeholder="请输入密码"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-row">
        <view class="remember-row" @click="remember = !remember">
          <view class="checkbox" :class="{ checked: remember }">
            <text v-if="remember" class="check-mark">✓</text>
          </view>
          <text class="remember-text">记住账号</text>
        </view>
        <text class="forgot" @click="onStub('忘记密码')">忘记密码？</text>
      </view>

      <button class="login-btn" :disabled="loading" @click="handleLogin">
        {{ loading ? '登录中...' : '登 录' }}
      </button>

      <view class="agreement" @click="onStub('用户协议')">
        <text class="agreement-text">登录即代表同意《用户协议》和《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script>
import { login } from '@/api/user'
import { setToken, getSavedAccount, setSavedAccount } from '@/utils/auth'

export default {
  data() {
    return {
      account: '',
      password: '',
      remember: false,
      loading: false,
    }
  },
  onLoad() {
    const saved = getSavedAccount()
    if (saved) {
      this.account = saved
      this.remember = true
    }
  },
  methods: {
    onStub(name) {
      uni.showToast({ title: `${name}：敬请期待`, icon: 'none' })
    },
    async handleLogin() {
      if (this.loading) return

      if (!this.account.trim()) {
        uni.showToast({ title: '请输入账号', icon: 'none' })
        return
      }
      if (this.password.length < 6) {
        uni.showToast({ title: '密码不能少于6位', icon: 'none' })
        return
      }

      this.loading = true
      try {
        const res = await login(this.account.trim(), this.password)
        setToken(res.token)
        if (this.remember) {
          setSavedAccount(res.account)
        } else {
          uni.removeStorageSync('account')
        }
        uni.showToast({ title: '登录成功', icon: 'success' })
        setTimeout(() => {
          uni.switchTab({ url: '/pages/portal/portal' })
        }, 400)
      } catch (e) {
        uni.showToast({ title: e.message || '登录失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$brand: #00a394;

.login-page {
  box-sizing: border-box;
  min-height: 100vh;
  /* #ifdef H5 */
  /* H5 顶部有 44px 导航栏，100vh 会溢出产生竖向滚动条 */
  min-height: calc(100vh - var(--window-top, 0px) - var(--window-bottom, 0px));
  /* #endif */
  background: linear-gradient(180deg, #35d3b6 0%, #00b4e6 42%, #fff 42%, #fff 100%);
  padding-bottom: 60rpx;
}

.brand {
  padding: 120rpx 0 70rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  font-size: 56rpx;
  font-weight: 700;
  color: $brand;
  background: #fff;
  border-radius: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.12);
}

.brand-name {
  margin-top: 24rpx;
  font-size: 40rpx;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4rpx;
}

.brand-slogan {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
}

.login-card {
  width: 660rpx;
  margin: 0 auto;
  padding: 50rpx 46rpx 40rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 40rpx rgba(6, 179, 199, 0.15);
}

.card-tabs {
  display: flex;
  gap: 40rpx;
  margin-bottom: 44rpx;
}

.tab {
  font-size: 32rpx;
  color: #999;
  padding-bottom: 14rpx;
  position: relative;

  &.active {
    color: #1f2329;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 48rpx;
      height: 6rpx;
      border-radius: 3rpx;
      background: $brand;
    }
  }
}

.form-item {
  margin-bottom: 28rpx;
}

.form-input {
  height: 92rpx;
  padding: 0 28rpx;
  font-size: 30rpx;
  background: #f4fbfc;
  border-radius: 16rpx;
  color: #1f2329;
}

.placeholder {
  color: #9aa5b1;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.remember-row {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 34rpx;
  height: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #c4cad6;
  border-radius: 50%;
  margin-right: 12rpx;

  &.checked {
    background: $brand;
    border-color: $brand;
  }
}

.check-mark {
  font-size: 22rpx;
  color: #fff;
}

.remember-text {
  font-size: 26rpx;
  color: #5a6270;
}

.forgot {
  font-size: 26rpx;
  color: #999;
}

.login-btn {
  height: 92rpx;
  line-height: 92rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #35d3b6, #00b4e6);
  border-radius: 999rpx;
  box-shadow: 0 8rpx 20rpx rgba(6, 179, 199, 0.3);

  &[disabled] {
    background: #a7e6de;
    color: #fff;
    box-shadow: none;
  }
}

.agreement {
  margin-top: 30rpx;
  text-align: center;
}

.agreement-text {
  font-size: 22rpx;
  color: #9aa5b1;
}
</style>
