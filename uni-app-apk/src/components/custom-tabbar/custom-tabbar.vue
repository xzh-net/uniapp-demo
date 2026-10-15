<template>
  <view class="tabbar">
    <view
      v-for="t in tabs"
      :key="t.path"
      class="tabbar-item"
      @click="switchTab(t.path)"
    >
      <view class="tabbar-icon" :class="{ active: current === t.path }">
        <text>{{ t.icon }}</text>
        <view v-if="t.badge" class="tabbar-badge">{{ t.badge }}</view>
      </view>
      <text class="tabbar-label" :class="{ active: current === t.path }">{{ t.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CustomTabbar',
  props: {
    current: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tabs: [
        { path: '/pages/portal/portal', text: '首页', icon: '首', badge: 0 },
        { path: '/pages/category/category', text: '分类', icon: '类', badge: 0 },
        { path: '/pages/favorites/favorites', text: '收藏', icon: '藏', badge: 0 },
        { path: '/pages/mine/mine', text: '我的', icon: '我', badge: 0 },
      ],
    }
  },
  mounted() {
    this.hideNativeTabBar()
  },
  methods: {
    hideNativeTabBar() {
      // #ifdef APP-PLUS || H5
      try {
        const res = uni.hideTabBar({ animation: false })
        if (res && typeof res.catch === 'function') res.catch(() => {})
      } catch (e) {}
      // #endif
    },
    switchTab(path) {
      if (this.current === path) return
      uni.switchTab({ url: path })
    },
  },
}
</script>

<style lang="scss" scoped>
$brand: #00a394;
$grad: linear-gradient(135deg, #35d3b6, #00b4e6);

.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  background: #fff;
  padding-top: 14rpx;
  padding-bottom: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -6rpx 24rpx rgba(6, 179, 199, 0.1);
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabbar-icon {
  position: relative;
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 700;
  color: #9aa5b1;
  background: #eef4f5;
  border-radius: 18rpx;
  transition: all 0.2s;

  &.active {
    color: #fff;
    background: $grad;
    box-shadow: 0 6rpx 14rpx rgba(0, 180, 200, 0.35);
  }
}

.tabbar-badge {
  position: absolute;
  top: -8rpx;
  right: -10rpx;
  min-width: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  padding: 0 8rpx;
  box-sizing: border-box;
  font-size: 18rpx;
  color: #fff;
  background: #ff5d5d;
  border-radius: 999rpx;
  text-align: center;
}

.tabbar-label {
  margin-top: 8rpx;
  font-size: 20rpx;
  color: #9aa5b1;

  &.active {
    color: $brand;
    font-weight: 700;
  }
}
</style>
