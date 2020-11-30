<template>
  <div class="article">
    <div class="article-header">   
        <input type="text" class="article-title" placeholder="请输入标题">
        <div class="article-header-btn">
            <Button type="text" style="color: #2d8cf0;">暂存</Button>
            <Dropdown placement="bottom-end">
              <Button type="primary">
                  发布
                  <Icon type="ios-arrow-down"></Icon>
              </Button>
              <div slot="list" style="width: 200px">
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
        </div>
    </div>
    <VueMeditor class="vue-meditor"></VueMeditor>
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
        width: 85%;
        border: none;
        padding-left: 10px;
        font-size: 20px;
        border: 1px solid #e8eaec;
      }
      .article-header-btn {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-evenly;
        border: 1px solid #e8eaec;
      }
      .article-title:focus {
        outline: none;
      }
    }
    .vue-meditor {
      height: calc(100vh - 250px) !important;
    }
}
</style>
