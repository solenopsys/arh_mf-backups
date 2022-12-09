const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const {iconPlug} = require('../icons');
const share = mf.share;

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath =
  process.env.NX_TSCONFIG_PATH ??
  path.join(__dirname, '../../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [
    /* mapped paths to share */
  ],
  workspaceRootPath
);

module.exports = {
  output: {
    uniqueName: 'backups',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'backups',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': 'packages/modules/backups-invicta/src/app/entry.module.ts',
      },
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        '@ngxs/store': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.7.5',
        },
        '@ngxs/devtools-plugin': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.7.5',
        },
        '@ngxs/router-plugin': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.7.5',
          includeSecondaries: true,
        },
        '@ngxs/logger-plugin': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.7.5',
        },
        '@solenopsys/lib-hyperstreams': {
          singleton: true,
          import : "packages/data/hstream/src/index"
        },
        rxjs: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '7.5.5',
          includeSecondaries: true,
        },

        ...sharedMappings.getDescriptors(),
      }),
      library: {
        type: 'module',
      },
    }),
    iconPlug(
      'packages/fui/icons/src',
      'dist/modules/alexstorm/backups',
      'packages/modules/backups-invicta/src/assets/menu.json'
    ),
    sharedMappings.getPlugin(),
  ],
};
