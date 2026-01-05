import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";

export function useTagList() {
  const cookie = useCookies();
  const route = useRoute();
  const router = useRouter();

  const activeTab = ref(route.path);

  const tabList = ref([
    {
      title: "首页",
      path: "/",
    },
  ]);
  // 监听路由变化
  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path;
    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });
  // 添加标签导航
  function addTab(tab) {
    let noTab =
      tabList.value.findIndex((item) => item.path === tab.path) === -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }
  // 删除标签导航
  function removeTab(path) {
    let tbs = tabList.value;
    let currTab = activeTab.value;
    if (currTab === path) {
      tbs.forEach((tab, index) => {
        if (tab.path === path) {
          const nextTab = tbs[index + 1] || tbs[index - 1];
          if (nextTab) {
            currTab = nextTab.path;
          }
        }
      });
    }
    activeTab.value = currTab;
    tabList.value = tbs.filter((item) => item.path !== path);
    cookie.set("tabList", tabList.value);
    router.push(currTab);
  }

  // 切换标签导航
  function changeTab(path) {
    activeTab.value = path;
    router.push(path);
  }

  // 初始化标签导航列表
  function initTabList() {
    let tbs = cookie.get("tabList");
    if (tbs) {
      tabList.value = tbs;
    }
  }
  initTabList();

  const handleClose = (cmd) => {
    if (cmd === "closeAll") {
      // switch to home
      activeTab.value = "/";
      router.push("/");
      tabList.value = [{ title: "首页", path: "/" }];
    } else if (cmd === "closeOther") {
      tabList.value = tabList.value.filter(
        (item) => item.path === "/" || item.path === activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
  };

  return {
    activeTab,
    tabList,
    removeTab,
    changeTab,
    handleClose,
  };
}
