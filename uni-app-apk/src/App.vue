<script>
export default {
  onLaunch: function () {
    // #ifdef APP-PLUS || H5
    try {
        const res = uni.hideTabBar({ animation: false })
        if (res && typeof res.catch === 'function') res.catch(() => {})
      } catch (e) {}
    // #endif
  },
  onShow: function () {
    // #ifdef APP-PLUS || H5
    try {
        const res = uni.hideTabBar({ animation: false })
        if (res && typeof res.catch === 'function') res.catch(() => {})
      } catch (e) {}
    // #endif
  },
  onHide: function () {},
}
</script>

<style>
/*每个页面公共css */
page {
  background-color: #f4fbfc;
}
</style>
