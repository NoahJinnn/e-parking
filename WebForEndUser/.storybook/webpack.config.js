const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const SRC_PATH = path.join(__dirname, "../src");
const STORIES_PATH = path.join(__dirname, "../stories");
//dont need stories path if you have your stories inside your //components folder
module.exports = ({ config }) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [SRC_PATH, STORIES_PATH],
        use: [
            {
                loader: require.resolve("awesome-typescript-loader"),
                options: {
                    configFileName: "./.storybook/tsconfig.json",
                },
            },
            { loader: require.resolve("react-docgen-typescript-loader") },
        ],
    });
    config.module.rules.push({
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    });
    config.resolve.extensions.push(".ts", ".tsx", ".scss");
    return config;
};
