fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Nage Team - https://discord.gg/ddMtV2CwJj'
description 'Nage Scoreboard :)'
version '1.0.0'

client_scripts {
    'client/*.lua'
}

server_scripts {
  'server/*.lua'
}

ui_page 'html/index.html'

files {
  'html/index.html',
  'html/css/*.css',
  'html/js/*.js',
  'html/assets/*'
}
