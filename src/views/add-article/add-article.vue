<template>
  <div class="article">
    <div class="article-header">
        <div class="header-le">
            <Icon type="ios-arrow-back" class="router-go"/>
            <span class="blog-title">irain</span>
        </div>
        <div class="header-cen">
          <span class="irain-pageTitle">写文章</span>
          <span class="irian-pageSubTitle">草稿已保存</span>
        </div>
        <div class="header-ri">
            <Dropdown>
              <Button type="primary">
                  发布
                  <Icon type="ios-arrow-down"></Icon>
              </Button>
              <div slot="list" style="width: 200px">
                123
              </div>
            </Dropdown>
        </div>
    </div>
    <div class="article-center">
      <div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: block; height: 200px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="40"></Icon>
          </div>
      </Upload>
      </div>
      <input type="text" class="article-title" placeholder="请输入标题">
      <VueMeditor class="markdown-pro" :toolbars="toolbars" :bordered="false" style="height: 600px"></VueMeditor>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueMeditor from '../../components/VueMeditor'
import { Button, Dropdown, DropdownMenu, DropdownItem, Icon, Upload } from 'view-design'
export default {
  name: 'AddArticle',
  components: {
    VueMeditor,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Upload,
  }
}
</script>
<style lang="less">
.article {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(255, 255, 255);
    overflow-x: hidden;
    .article-header {
      position: fixed;
      z-index: 10;
      width: 100%;
      display: flex;
      height: 64px;
      background: #fff;
      box-shadow: 0 2px 0px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      align-items: center;
      .header-le {
        box-sizing: content-box;
        display: flex;
        width: 20%;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        .router-go {
          font-size: 25px;
          font-weight: 600;
          cursor: pointer;
        }
        .router-go:hover {
          color:  rgb(0, 132, 255);
        }
        .blog-title {
          position: relative;
          font-size: 30px;
          font-weight: 700;
          color:  rgb(0, 132, 255);
        }
        .blog-title::after {
              content: '';
              display: block;
              border-right: 2px solid #DCDFE6;
              height: 32px;
              position: absolute;
              right: -10px;
              top: 6px;
        }
      }
      .header-cen {
          width: 60%;
          padding-left: 20px;
          .irain-pageTitle {
            color: #121212;
            font-weight: 600;
            margin-right: 20px;
          }
          .irian-pageSubTitle {
                flex: 1 1;
                max-height: 22px;
                overflow: hidden;
                color: #999;
          }
      }
      .header-ri {
        flex: 1;
      }
    }
    .article-center {
      padding-top: 100px;
      width: 60%;
      margin: 0 auto;
      .article-title {
        display: block;
        width: 100%;
        line-height: 50px;
        border: none;
        font-size: 20px;
        font-weight: 500;
        border-bottom: 1px solid #d9d9d9;
        outline:none;
      }
    }
    // .vue-meditor {
    //   height: calc(100vh - 250px) !important;
    // }
}
.ivu-upload.ivu-upload-drag {
    height: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
