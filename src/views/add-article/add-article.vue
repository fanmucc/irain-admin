<template>
  <div class="article">
    <div class="article-header">   
        <input type="text" class="article-title" placeholder="请输入标题">
        <Dropdown style="flex: 1;margin-left: 5px;">
          <a href="javascript:void(0)">
              下拉菜单
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <div slot="list">
            123
          </div>
          <!-- <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu> -->
      </Dropdown>
      <Button type="text" style="color: #2d8cf0; flex: 1;">暂存</Button>
      <Button type="primary" size="large" style="flex: 1;">发布</Button>
    </div>
    <VueMeditor></VueMeditor>
  </div>
</template>

<script>
// @ is an alias to /src
import VueMeditor from '../../components/VueMeditor'
import { Button, Dropdown, DropdownMenu, DropdownItem, Icon } from 'view-design'
export default {
  name: 'AddArticle',
  components: {
    VueMeditor,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon
  }
}
</script>
<style lang="less">
.article {
    padding: 20px;
    background-color: #fff;
    .article-header {
      height: 64px;
      line-height: 64px;
      display: flex;
      align-items: center;
      .article-title {
        width: 73%;
        border: none;
        padding-left: 10px;
        font-size: 16px;
        border-right: 1px solid #e8eaec;
      }
      .article-title:focus {
        outline: none;
      }
    }
}
</style>
