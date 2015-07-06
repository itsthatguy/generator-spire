# <%= projectName %>
<%= projectDesc %>

### Install requirements
```shell
npm install
```

### Running things
```shell
<% if (nwjs) { %># Running without nw.js (many features will break)<% } %>
$(npm bin)/gulp serve # starts the app in the browser
<% if (nwjs) { %>
# Running in nw.js
$(npm bin)/gulp watch
npm start # starts the app in webkit (use with gulp watch)
<% } %>```
