elastic-player
==============

This is a simple HTML5 customized player.
**Demo:** http://saitodisse.github.io/elastic-player (gh-pages branch)

  - yoeman backbone generated (https://github.com/yeoman/generator-backbone)
    - backbone.js (http://backbonejs.org/)
    - grunt (http://gruntjs.com/)
    - require.js (http://requirejs.org/)
    - sass-bootstrap (https://github.com/twbs/bootstrap)
    - ejs templates (http://embeddedjs.com/)

### Requirements
  - nodejs (http://nodejs.org/)
  - grunt (http://gruntjs.com/)

### Part of local-music-party
see: https://github.com/saitodisse/socket-io-server for more information

### Instalation
All code is on **src/** folder. You have to go there.

    cd src
    sudo npm i
    bower i
    grunt serve

**go to:** http://localhost:9000/


### Build
When you build all **dist** code is copied to **root**, so the gh-pages just works.

    cd src
    grunt build
    

### Easy tasks

  - start server and open sublime
```
    bash serve.sh
```

  - Deploy to github
```
    bash deploy.sh
```

    

