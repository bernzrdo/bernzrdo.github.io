const mix = require('laravel-mix')

mix.disableSuccessNotifications()

mix.options({
    manifest: false,
    publicPath: 'docs'
})

mix.sass('src/style.scss', 'style.css')
mix.ts('src/script.ts', 'script.js')