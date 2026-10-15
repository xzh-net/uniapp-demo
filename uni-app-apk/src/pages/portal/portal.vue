<template>
  <view class="portal-page">
    <!-- 顶部：搜索 -->
    <view class="header">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">{{ keywords }}</text>
      </view>
    </view>

    <view class="content">
      <!-- 常用工具（硬编码） -->
      <view class="section">
        <view class="section-hd">
          <text class="section-title">常用工具</text>
          <text class="section-more" @click="onStub('全部工具')">全部 ›</text>
        </view>
        <scroll-view scroll-x class="common-scroll">
          <view class="common-item" v-for="t in commonTools" :key="t.name" @click="onStub(t.name)">
            <view class="common-icon" :style="{ background: t.bg }">{{ t.icon }}</view>
            <text class="common-name">{{ t.name }}</text>
          </view>
        </scroll-view>
      </view>

      <!-- 分类金刚区（硬编码） -->
      <view class="section">
        <view class="section-hd">
          <text class="section-title">全部分类</text>
        </view>
        <view class="grid">
          <view
            v-for="c in categories"
            :key="c.name"
            class="grid-item"
            @click="onStub(c.name)"
          >
            <view class="grid-icon" :style="{ background: c.bg }">{{ c.icon }}</view>
            <text class="grid-name">{{ c.name }}</text>
          </view>
        </view>
      </view>

      <!-- 推荐工具（硬编码双列） -->
      <view class="section">
        <view class="section-hd">
          <text class="section-title">推荐工具</text>
          <text class="section-sub">轻巧 · 免费 · 无需登录</text>
        </view>
        <view class="tool-grid">
          <view class="tool-card" v-for="t in recommendTools" :key="t.name" @click="onStub(t.name)">
            <view class="tool-img" :style="{ background: t.bg }">{{ t.icon }}</view>
            <text class="tool-name">{{ t.name }}</text>
            <text class="tool-users">{{ t.users }}人在用</text>
          </view>
        </view>
      </view>
    </view>

    <custom-tabbar current="/pages/portal/portal" />
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      keywords: '搜索工具：二维码 / JSON / 时间戳',
      commonTools: [
        { name: '二维码', icon: '码', bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
        { name: '时间戳', icon: '时', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
        { name: 'JSON', icon: '结', bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
        { name: 'Base64', icon: '编', bg: 'linear-gradient(135deg, #ffe8f2, #ffb8d6)' },
        { name: '密码生成', icon: '密', bg: 'linear-gradient(135deg, #fff5d6, #ffe49a)' },
        { name: '单位换算', icon: '换', bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
      ],
      categories: [
        { name: '文本工具', icon: '文', bg: 'linear-gradient(135deg, #35d3b6, #00b4e6)' },
        { name: '图片工具', icon: '图', bg: 'linear-gradient(135deg, #56ccf2, #7b61ff)' },
        { name: '计算工具', icon: '算', bg: 'linear-gradient(135deg, #7b61ff, #a78bfa)' },
        { name: '设备工具', icon: '设', bg: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
        { name: '开发工具', icon: '研', bg: 'linear-gradient(135deg, #2b6de5, #6a5cff)' },
        { name: '日常生活', icon: '生', bg: 'linear-gradient(135deg, #f472b6, #fb7185)' },
        { name: '网络工具', icon: '网', bg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
        { name: '更多工具', icon: '全', bg: 'linear-gradient(135deg, #8a919f, #b0b6c3)' },
      ],
      recommendTools: [
        { name: '二维码生成器', desc: '文本 / 链接一键生成', icon: '码', tags: ['免费', '秒开'], users: '3.2万', bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
        { name: '时间戳转换', desc: '毫秒 / 秒 双向转换', icon: '时', tags: ['开发常用'], users: '2.8万', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
        { name: 'JSON 格式化', desc: '高亮 · 校验 · 压缩', icon: '结', tags: ['高亮', '校验'], users: '5.1万', bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
        { name: 'Base64 编解码', desc: '文本与数据互转', icon: '编', tags: ['双向转换'], users: '1.9万', bg: 'linear-gradient(135deg, #ffe8f2, #ffb8d6)' },
        { name: '密码生成器', desc: '安全随机 · 可定强度', icon: '密', tags: ['安全', '本地'], users: '1.5万', bg: 'linear-gradient(135deg, #fff5d6, #ffe49a)' },
        { name: '单位换算器', desc: '长度 / 面积 / 体积', icon: '换', tags: ['日常'], users: '9800', bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
      ],
    }
  },
  onShow() {
    if (!getToken()) {
      uni.reLaunch({ url: '/pages/login/login' })
      return
    }
  },
  methods: {
    onStub(name) {
      uni.showToast({ title: `${name}：敬请期待`, icon: 'none' })
    },
  },
}
</script>

<style lang="scss" scoped>
$brand: #00a394;
$grad: linear-gradient(90deg, #35d3b6, #00b4e6);

.portal-page {
  min-height: 100vh;
  background: #f4fbfc;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20rpx 24rpx;
  background: $grad;
}

.search-bar {
  height: 72rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  background: #fff;
  border-radius: 999rpx;
}

.search-icon {
  font-size: 26rpx;
  margin-right: 12rpx;
}

.search-placeholder {
  font-size: 26rpx;
  color: #9aa5b1;
}

.content {
  padding: 24rpx;
}

.section {
  margin-bottom: 24rpx;
  padding: 28rpx 24rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 24rpx rgba(6, 179, 199, 0.06);
}

.section-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2329;
}

.section-sub {
  font-size: 22rpx;
  color: #9aa5b1;
}

.section-more {
  font-size: 24rpx;
  color: #9aa5b1;
}

/* 常用工具横排 */
.common-scroll {
  white-space: nowrap;
}

.common-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 150rpx;
  margin-right: 12rpx;
}

.common-icon {
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 38rpx;
  font-weight: 700;
  color: $brand;
  border-radius: 28rpx;
}

.common-name {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #333;
}

/* 金刚区 */
.grid {
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 26rpx;
}

.grid-icon {
  width: 96rpx;
  height: 96rpx;
  line-height: 96rpx;
  text-align: center;
  font-size: 36rpx;
  font-weight: 700;
  color: #fff;
  border-radius: 30rpx;
}

.grid-name {
  margin-top: 14rpx;
  font-size: 24rpx;
  color: #333;
}

/* 推荐三列小卡 */
.tool-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tool-card {
  box-sizing: border-box;
  width: 31.5%;
  margin-bottom: 20rpx;
  padding: 24rpx 12rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9fdfd;
  border: 1px solid #eef5f6;
  border-radius: 20rpx;
}

.tool-img {
  width: 84rpx;
  height: 84rpx;
  line-height: 84rpx;
  text-align: center;
  font-size: 34rpx;
  font-weight: 700;
  color: $brand;
  border-radius: 22rpx;
}

.tool-name {
  margin-top: 14rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: #1f2329;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-users {
  margin-top: 6rpx;
  font-size: 20rpx;
  color: #9aa5b1;
}
</style>
