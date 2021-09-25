module.exports = {
  plugins: {
    '@moohng/postcss-px2vw': {
      // rootValue: 100,  // 可不填写 默认先转为vm 浏览器不支持的话才会为rem (此处为参考html字号)
      viewportWidth: 1920 // 填入开发机浏览器屏幕可是宽度就行;
    }
  }
}
