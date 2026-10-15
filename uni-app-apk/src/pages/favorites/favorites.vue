<template>
  <view class="fav-page">
    <view class="page-hd">
      <text class="page-title">我的收藏</text>
      <text class="page-count">共 {{ favCount }} 个</text>
    </view>

    <view class="fav-list">
      <view class="fav-item" v-for="(t, i) in tools" :key="t.name">
        <view class="fav-main" @click="onStub(t.name)">
          <view class="fav-icon" :style="{ background: t.bg }">{{ t.icon }}</view>
          <view class="fav-info">
            <text class="fav-name">{{ t.name }}</text>
            <text class="fav-desc">{{ t.desc }}</text>
          </view>
        </view>
        <view class="fav-btn" :class="{ on: t.fav }" @click="toggle(i)">
          {{ t.fav ? '已藏' : '收藏' }}
        </view>
      </view>
    </view>

    <view class="empty-tip" v-if="!favCount">还没有收藏的工具，去首页逛逛吧</view>

    <custom-tabbar current="/pages/favorites/favorites" />
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      tools: [
        { name: 'JSON 格式化', desc: '高亮 · 校验 · 压缩', icon: '结', fav: true, bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
        { name: '二维码生成器', desc: '文本 / 链接一键生成', icon: '码', fav: true, bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
        { name: '时间戳转换', desc: '毫秒 / 秒 双向转换', icon: '时', fav: true, bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
        { name: '密码生成器', desc: '安全随机 · 可定强度', icon: '密', fav: false, bg: 'linear-gradient(135deg, #fff5d6, #ffe49a)' },
        { name: '单位换算器', desc: '长度 / 面积 / 体积', icon: '换', fav: false, bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
      ],
    }
  },
  computed: {
    favCount() {
      return this.tools.filter((t) => t.fav).length
    },
  },
  onShow() {
    if (!getToken()) {
      uni.reLaunch({ url: '/pages/login/login' })
      return
    }
  },
  methods: {
    toggle(i) {
      this.tools[i].fav = !this.tools[i].fav
    },
    onStub(name) {
      uni.showToast({ title: `${name}：敬请期待`, icon: 'none' })
    },
  },
}
</script>

<style lang="scss" scoped>
$brand: #00a394;

.fav-page {
  min-height: 100vh;
  background: #f4fbfc;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.page-hd {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 30rpx 30rpx 6rpx;
}

.page-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #1f2329;
}

.page-count {
  font-size: 24rpx;
  color: #9aa5b1;
}

.fav-list {
  padding: 20rpx 24rpx;
}

.fav-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  margin-bottom: 18rpx;
  background: #fff;
  border: 1px solid #eef5f6;
  border-radius: 20rpx;
}

.fav-main {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.fav-icon {
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 38rpx;
  font-weight: 700;
  color: $brand;
  border-radius: 24rpx;
  flex-shrink: 0;
}

.fav-info {
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.fav-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2329;
}

.fav-desc {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #9aa5b1;
}

.fav-btn {
  padding: 12rpx 30rpx;
  font-size: 24rpx;
  color: #9aa5b1;
  background: #f4f6f8;
  border-radius: 999rpx;
  flex-shrink: 0;

  &.on {
    color: $brand;
    background: rgba(0, 163, 148, 0.1);
    border: 1px solid rgba(0, 163, 148, 0.4);
  }
}

.empty-tip {
  padding: 120rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #9aa5b1;
}
</style>
