<template>
  <view class="category-page">
    <view class="search-wrap">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">搜索工具</text>
      </view>
    </view>

    <view class="body">
      <!-- 左侧一级分类 -->
      <scroll-view scroll-y class="side">
        <view
          v-for="(c, i) in categories"
          :key="c.name"
          class="side-item"
          :class="{ active: i === activeIndex }"
          @click="activeIndex = i"
        >
          {{ c.name }}
        </view>
      </scroll-view>

      <!-- 右侧二级分类 + 工具列表 -->
      <scroll-view scroll-y class="main">
        <view class="banner" :style="{ background: current.grad }">
          <text class="banner-text">{{ current.name }} · {{ current.subs.length * 12 }}+ 工具</text>
        </view>

        <view class="sub-grid">
          <view v-for="s in current.subs" :key="s" class="sub-item" @click="onStub(s)">
            <view class="sub-icon" :style="{ background: current.grad }">{{ s[0] }}</view>
            <text class="sub-name">{{ s }}</text>
          </view>
        </view>

        <view class="hot-title">热门工具</view>
        <view class="hot-item" v-for="t in current.tools" :key="t.name" @click="onStub(t.name)">
          <view class="hot-img" :style="{ background: t.bg }">{{ t.icon }}</view>
          <view class="hot-info">
            <text class="hot-name">{{ t.name }}</text>
            <text class="hot-desc">{{ t.desc }}</text>
            <view class="hot-bottom">
              <text class="hot-users">{{ t.users }}人在用</text>
              <text class="hot-go">打开 ›</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <custom-tabbar current="/pages/category/category" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      categories: [
        {
          name: '文本工具',
          grad: 'linear-gradient(135deg, #35d3b6, #00b4e6)',
          subs: ['Base64', 'JSON格式化', '文本去重', '字数统计', '繁简转换', '大小写'],
          tools: [
            { name: 'JSON 格式化', desc: '高亮 · 校验 · 压缩', users: '5.1万', icon: '结', bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
            { name: '文本去重', desc: '多行文本一键去重', users: '8600', icon: '去', bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
            { name: '字数统计', desc: '字符 / 单词 / 行数', users: '1.2万', icon: '数', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
          ],
        },
        {
          name: '图片工具',
          grad: 'linear-gradient(135deg, #56ccf2, #7b61ff)',
          subs: ['二维码生成', '图片压缩', '屏幕取色', '图片转文字', '加水印', '壁纸尺寸'],
          tools: [
            { name: '二维码生成器', desc: '文本 / 链接一键生成', users: '3.2万', icon: '码', bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
            { name: '屏幕取色器', desc: 'HEX / RGB 色值提取', users: '7400', icon: '色', bg: 'linear-gradient(135deg, #ffe8f2, #ffb8d6)' },
            { name: '图片压缩', desc: '批量压缩不失真', users: '1.6万', icon: '压', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
          ],
        },
        {
          name: '计算工具',
          grad: 'linear-gradient(135deg, #7b61ff, #a78bfa)',
          subs: ['科学计算器', '单位换算', '汇率换算', '日期计算', 'BMI计算', '房贷计算'],
          tools: [
            { name: '单位换算器', desc: '长度 / 面积 / 体积', users: '9800', icon: '换', bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
            { name: '汇率换算', desc: '常用货币实时参考', users: '1.1万', icon: '汇', bg: 'linear-gradient(135deg, #fff5d6, #ffe49a)' },
            { name: '日期计算器', desc: '日期差 / 相隔天数', users: '6200', icon: '日', bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
          ],
        },
        {
          name: '设备工具',
          grad: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
          subs: ['设备信息', '屏幕测试', '电池信息', '分辨率', '指南针', '手电筒'],
          tools: [
            { name: '设备信息', desc: '机型 / 系统 / 硬件', users: '2.4万', icon: '设', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
            { name: '屏幕测试', desc: '坏点 / 灰阶 / 触控', users: '5300', icon: '屏', bg: 'linear-gradient(135deg, #d9fff6, #a8f5e4)' },
            { name: '电池信息', desc: '健康度 / 温度 / 电压', users: '8900', icon: '电', bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
          ],
        },
        {
          name: '开发工具',
          grad: 'linear-gradient(135deg, #2b6de5, #6a5cff)',
          subs: ['时间戳', 'UUID生成', '进制转换', 'MD5加密', '正则测试', 'UserAgent'],
          tools: [
            { name: '时间戳转换', desc: '毫秒 / 秒 双向转换', users: '2.8万', icon: '时', bg: 'linear-gradient(135deg, #dff4ff, #aee4ff)' },
            { name: '进制转换', desc: '2 / 8 / 10 / 16 互转', users: '7600', icon: '进', bg: 'linear-gradient(135deg, #e8e2ff, #c9c0ff)' },
            { name: '正则测试', desc: '实时匹配 + 高亮', users: '1.3万', icon: '正', bg: 'linear-gradient(135deg, #ffe8f2, #ffb8d6)' },
          ],
        },
        {
          name: '日常生活',
          grad: 'linear-gradient(135deg, #f472b6, #fb7185)',
          subs: ['分贝仪', '倒计时', '随机抽奖', '个税计算', '房贷计算', '水平仪'],
          tools: [
            { name: '分贝仪', desc: '噪音水平实时检测', users: '4100', icon: '分', bg: 'linear-gradient(135deg, #fff5d6, #ffe49a)' },
            { name: '倒计时', desc: '重要日子提醒', users: '6800', icon: '倒', bg: 'linear-gradient(135deg, #ffe8f2, #ffb8d6)' },
            { name: '随机抽奖', desc: '转盘 / 抽签 / 分组', users: '1.0万', icon: '抽', bg: 'linear-gradient(135deg, #dcf7e6, #aef0c9)' },
          ],
        },
      ],
    }
  },
  computed: {
    current() {
      return this.categories[this.activeIndex]
    },
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

.category-page {
  height: calc(100vh - 140rpx - env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  background: #f4fbfc;
}

.search-wrap {
  padding: 16rpx 24rpx;
  background: linear-gradient(90deg, #35d3b6, #00b4e6);
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

.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.side {
  width: 180rpx;
  height: 100%;
  background: #fff;
}

.side-item {
  padding: 34rpx 20rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
  position: relative;

  &.active {
    color: $brand;
    font-weight: 700;
    background: #f4fbfc;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rpx;
      height: 36rpx;
      background: $brand;
      border-radius: 3rpx;
    }
  }
}

.main {
  flex: 1;
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}

.banner {
  height: 140rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
}

.banner-text {
  font-size: 30rpx;
  font-weight: 700;
  color: #fff;
}

.sub-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
}

.sub-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24rpx;
}

.sub-icon {
  width: 96rpx;
  height: 96rpx;
  line-height: 96rpx;
  text-align: center;
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
  border-radius: 20rpx;
}

.sub-name {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
}

.hot-title {
  margin: 10rpx 0 20rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2329;
}

.hot-item {
  display: flex;
  background: #fff;
  border: 1px solid #eef5f6;
  border-radius: 16rpx;
  padding: 18rpx;
  margin-bottom: 18rpx;
}

.hot-img {
  width: 130rpx;
  height: 130rpx;
  line-height: 130rpx;
  text-align: center;
  font-size: 44rpx;
  font-weight: 700;
  color: $brand;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.hot-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
}

.hot-name {
  font-size: 27rpx;
  font-weight: 600;
  color: #1f2329;
}

.hot-desc {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #9aa5b1;
}

.hot-bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.hot-users {
  font-size: 20rpx;
  color: #9aa5b1;
}

.hot-go {
  font-size: 22rpx;
  font-weight: 600;
  color: $brand;
}
</style>
