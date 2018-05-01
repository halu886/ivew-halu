<style lang="less">
@import "./401.less";
</style>

<template>
    <div class="error403">
        <div class="error403-body-con">
            <Card>
                <div class="error403-body-con-title">4
                    <span class="error403-0-span">
                        <Icon type="android-lock"></Icon>
                    </span>
                    <span class="error403-key-span">
                        <Icon size="220" type="ios-bolt"></Icon>
                    </span>
                </div>
                <p class="error403-body-con-message">用户 信息已过期 请重新登入</p>
                <div class="error403-btn-con">
                    <Button @click="login" size="large" style="width: 200px;" type="primary">重新登入</Button>
                    <!-- <Button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</Button> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
  name: "Error401",
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    // goHome() {
    //   this.$router.push({
    //     name: "home_index"
    //   });
    login() {
      this.$store.commit("logout", this);
      this.$store.commit("clearOpenedSubmenu");
      this.$router.go("login");
    }
  }
};
</script>
