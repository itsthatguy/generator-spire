# <%= projectName %>
<%= projectDesc %>

### Getting Started
```shell
npm install
```

### Running things
```shell
<% if (nwjs) { %># Running without nw.js (many features will break)<% } %>
# Start the app for use in the browser
$(npm bin)/gulp serve

# With the Mock server
STANDALONE=true $(npm bin)/gulp serve
```

You should now be able to visit the site at [http://localhost:3000/]

<% if (nwjs) { %>```shell
# Running in nw.js
$(npm bin)/gulp watch
npm start # starts the app in webkit (use with gulp watch)
<% } %>```
