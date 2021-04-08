const path = require("path");

module.exports = {
  resolve: {
    modules: ["node_modules", "es2015", "ts-loader"],
    extensions: [".ts", ".js", ".tsx", ".jsx"]
  },
	module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ["@babel/env"]
      }
    },{
      test: /\.(ts|tsx)/,
      loader: 'ts-loader'
    }]
	},
	output: {
    path: path.join(__dirname, "public"),
		filename: "bundle.js"
	},
  entry: "./src/main.ts",
  mode: "production",
  // mode: "development",
};