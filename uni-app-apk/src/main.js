import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { initPermission } from "./utils/permission";

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}

// 应用启动时做一次登录拦截
initPermission();
