import { ref, reactive } from "vue";
import { logout, changePassword } from "@/api/manager";
import { showModal, toast } from "@/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useRePassword() {
  const router = useRouter();
  const store = useStore();
  const formRef = ref(null);
  const formDrawerRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const rules = {
    oldpassword: [
      { required: true, message: "请输入旧密码", trigger: ["blur"] },
    ],
    password: [{ required: true, message: "请输入新密码", trigger: ["blur"] }],
    repassword: [
      { required: true, message: "请输入确认密码", trigger: ["blur"] },
    ],
  };
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }
      formDrawerRef.value.showLoading();
      changePassword(form)
        .then((res) => {
          toast("修改密码成功, 请重新登录", "success");
          store.dispatch("logout");
          router.push("/login");
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };
  const openRePasswordForm = () => formDrawerRef.value.open();
  return {
    form,
    rules,
    formRef,
    formDrawerRef,
    onSubmit,
    openRePasswordForm,
  };
}

export function useLogout() {
  const router = useRouter();
  const store = useStore();
  function handleLogout() {
    showModal("确定要退出登录吗？").then((res) => {
      logout().finally(() => {
        // remove token from cookie
        store.dispatch("logout");
        // go to login page
        router.push("/login");
        // msg hint
        toast("退出登录成功");
      });
    });
  }
  return {
    handleLogout,
  };
}
