# uni-app-apk

一个用于学习 **「uni-app 编写页面 → 编译 → 打出安卓 APK」** 完整流程的教学 demo。

- 登录页：账号密码登录（本地 Mock，无后端），支持记住账号
- 首页：工具箱首页 —— 常用工具横排、分类金刚区、推荐工具三列小卡（iOS 快捷指令风，数据全部硬编码）
- 底部 tabBar：首页 / 分类 / 收藏 / 我的 —— 自绘样式组件 `custom-tabbar`（原生 tabBar 经 `uni.hideTabBar` 隐藏，组件负责渲染与 `switchTab`，含安全区适配）
- 「我的」页：用户信息、使用统计、分组设置列表、退出登录
- 登录拦截：无 token 自动重定向登录页，退出登录后返回键无法回到首页

演示账号：`admin` / `123456`

## 技术栈

| 项 | 选型 |
| --- | --- |
| 框架 | uni-app（Vue 3 + Vite） |
| 语言 | JavaScript（非 TS） |
| UI | 原生样式 + SCSS |
| 状态 | 无 Vuex/Pinia，直接使用 `uni.setStorageSync` |
| 登录接口 | 纯前端本地模拟（`src/api/user.js`），无真实网络请求 |

## 目录结构

```
uni-app-apk/
├── index.html                 # H5 入口 html
├── package.json               # 依赖与脚本
├── vite.config.js             # Vite 配置（uni 插件）
└── src/
    ├── App.vue                # 应用入口（生命周期）
    ├── main.js                # 创建应用 + 挂载登录拦截
    ├── manifest.json          # 应用配置（应用名/包名/权限等，打包关键）
    ├── pages.json             # 页面路由配置（启动页为登录页）
    ├── uni.scss               # 全局 SCSS 变量
    ├── api/
    │   └── user.js            # 登录接口（Mock 实现）
    ├── components/
    │   └── custom-tabbar/custom-tabbar.vue  # 自绘底部选项卡（样式化，easycom 自动注册）
    ├── pages/
    │   ├── login/login.vue        # 登录页
    │   ├── portal/portal.vue      # 首页 tab（工具箱首页，硬编码数据）
    │   ├── category/category.vue  # 分类 tab（左侧分类 + 右侧工具列表，硬编码）
    │   ├── favorites/favorites.vue # 收藏 tab（收藏开关，纯本地硬编码）
    │   └── mine/mine.vue          # 我的 tab（退出登录在此）
    ├── static/                # 静态资源
    └── utils/
        ├── auth.js            # token / 账号 的 storage 封装
        └── permission.js      # 登录拦截（启动时校验 token）
```

> 另有 `src/utils/permission.js`：登录拦截逻辑，在 `main.js` 中启动时调用。

## 一、本地运行

环境要求：Node.js 18+，npm。

```bash
# 1. 安装依赖
npm install

# 2. 启动 H5 开发服务
npm run dev:h5
```

浏览器访问终端输出的地址（默认 `http://localhost:5173/`）：

1. 无登录态会自动进入登录页
2. 输入 `admin` / `123456` → 登录成功进入首页 tab（底部 tabBar：首页/分类/收藏/我的）
3. 错误密码会弹出 toast 提示
4. 点击任意工具卡片 → toast「敬请期待」
5. 「我的」页底部「退出登录」→ 返回登录页

### 真机 / 模拟器调试（可选）

- 手机安装「HBuilderX 真机运行 App」（DCloud App），USB 连接或同网段
- 或使用 HBuilderX 打开本项目后：运行 → 运行到手机或模拟器

> CLI 纯命令行调试 App 端需要额外的离线打包/基座配置，demo 学习流程建议用 HBuilderX（见下文打包章节）。

## 二、编译

```bash
# 编译 H5 产物 → dist/build/h5
npm run build:h5

# 编译各小程序平台产物（如微信）
npm run build:mp-weixin
```

本 demo 的 APK 产出走 HBuilderX 云打包，不需要命令行直接产出 apk。

## 三、打 APK 完整步骤（HBuilderX 云打包）

> 这是本 demo 的核心学习目标：把 uni-app 项目打成安卓 apk。

### 1. 安装 HBuilderX

- 官网下载「标准版」：https://www.dcloud.io/hbuilderx.html
- Windows / macOS 安装后首次启动会引导安装必要插件，按提示装完即可

### 2. 用 HBuilderX 打开本项目

- 菜单：**文件 → 打开目录**，选择本项目根目录（含 `package.json`、`src` 的这一层）
- CLI 项目可直接被 HBuilderX 识别，无需转换

### 3.（可选）先在模拟器/真机上跑一遍

- 菜单：**运行 → 运行到手机或模拟器 → 运行到 Android App 基座**
- 首次会提示安装「标准基座」，手机开启 USB 调试连接后自动安装
- 运行成功后在手机上验证：登录 `admin/123456` → 首页 → 退出登录

### 4. 云打包出 APK

1. 菜单：**发行 → 原生 App-云打包**
2. 弹窗中按如下选择：
   - 平台：勾选 **Android**
   - 证书：学习阶段选 **使用公共测试证书**（正式发布需用自己的证书）
   - 应用名称：`工具箱`
   - 版本号：`1.0.0`（与 `src/manifest.json` 中一致）
   - `uni-app` 相关选项保持默认
3. 点击「打包」→ 进入 DCloud 云打包队列（免费用户需排队，通常几分钟）
4. 打包成功后页面给出 **apk 下载链接**，下载即可；本地也会缓存在 HBuilderX 输出目录

> 包名配置在 `src/manifest.json` 的 `app-plus.distribute.android.packagename`，当前为 `com.demo.uniappapk`，云打包时也可临时修改。同包名 + 同证书 + 更高版本号才能覆盖安装。

### 5. 手机安装验证

1. 把 apk 传到安卓手机，点击安装（需允许「安装未知来源应用」）
2. 打开 app：
   - 首次进入登录页
   - `admin` / `123456` → 首页
   - 杀掉 app 重新打开 → 仍是首页（登录态已持久化）
   - 退出登录 → 回到登录页，按返回键无法回到首页

至此完成「uni-app → APK」全流程。

## 四、常见问题

| 问题 | 说明 |
| --- | --- |
| 云打包一直排队 | 免费通道高峰期排队较久，可稍后再试，或稍后在「发行 → App 云端构建」历史记录中查结果 |
| 云打包失败 | 查看错误日志；常见原因：包名格式非法、证书与包名不匹配、manifest 配置有误 |
| 真机运行连不上 | 手机与电脑需同一局域网；USB 调试需开启；部分手机需装驱动 |
| 安装 apk 提示「应用未安装」 | 手机上已有同包名不同签名的应用，先卸载再装；或修改包名重新打包 |
| `appid` 是什么 | DCloud 的应用标识，学习阶段可留空（用公共测试证书时）；正式发布建议在 DCloud 开发者中心创建应用后填入 |
| H5 能跑但找不到 apk | APK 不由 `npm run build` 产出，必须走 HBuilderX 云打包（见上文第三章） |

## 脚本一览

| 命令 | 作用 |
| --- | --- |
| `npm run dev:h5` | H5 开发服务（热更新） |
| `npm run build:h5` | H5 生产构建 |
| `npm run dev:mp-weixin` | 微信小程序开发服务 |
| `npm run build:mp-weixin` | 微信小程序构建 |
| `npm run dev:app` / `build:app` | App 端开发/构建（产物给离线打包用，云打包场景在 HBuilderX 内操作即可） |
