<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
        <Avatar v-if="userAvatar" :src="userAvatar" />
        <Avatar v-else style="color: #f56a00;background-color: #fde3cf">{{$store.state.user.userName.split('/')[0]}}</Avatar>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          个人资料
        </DropdownItem>
        <DropdownItem name="password">
          密码修改
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { Dropdown, Badge, Avatar, Icon, DropdownMenu, DropdownItem} from 'view-design'
import { mapActions } from 'vuex'
export default {
    name: 'User',
    components: {
        Dropdown,
        Badge,
        Avatar,
        Icon,
        DropdownMenu,
        DropdownItem
    },
    props: {
      userAvatar: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      handleClick (name) {
        switch (name) {
          case 'logout': this.logout().then(()=>{this.$router.push({name: 'Login'})}).catch(error => {console.log(error)})
            break
          case 'message': this.$router.push({name: 'IntoEdit'})
            break
          case 'password': this.$router.push({name: 'PasswordEdit'})
      }
      }
    }
}
</script>
<style lang="less">
@import './user.less';
</style>