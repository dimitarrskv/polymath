module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer")
              ]
            }
          }
        }
      ]
    },
  
    devServer: {
      disableHostCheck: true
    }
};
