<template>
    <MarkdownPro class="markdown-pro" :toolbars="toolbars" :bordered="false" ></MarkdownPro>
</template>
<script>
import { MarkdownPro } from 'vue-meditor'
export default {
    name: 'VueMeditor',
    components: {
        MarkdownPro
    },
    data () {
        return {
            toolbars: {
                // strong: false,
                // italic: false,
                // overline: false,
                // h1: false,
                // h2: false,
                // h3: false,
                // h4: false,
                // h5: false,
                // h6: false,
                // hr: false,
                quote: false,
                // ul: false,
                // ol: false,
                // code: false,
                link: false,
                image: false,
                table: false,
                // checked: false,
                // notChecked: false,
                // preview: false,
                split: false,
                print: false,
                theme: false,
                fullscreen: false,
                exportmd: false,
                importmd: false,
                save: false,
                clear: false
            }
        }
    }
}
</script>
<style lang="less">
</style>