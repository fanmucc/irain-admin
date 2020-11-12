module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
        // "import",
        // { libraryName: "ant-design-vue", libraryDirectory: "es", style: ['less', 'css'] },
        "import", {
          "libraryName": "view-design",
          "libraryDirectory": "src/components"
        }
    ]
  ]
}
