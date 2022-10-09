console.log(process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      replace: !!isProd,
      selectorBlackList: [
        'van-toast',
        'van-notify',
        'van-calendar',
        'van-picker',
        'van-uploader',
        'van-tabs',
        'van-tab',
        'van-dialog',
        'van-button'
      ],
      exclude: /node_modules/i,
      minPixelValue: 2
    }
  }
};
