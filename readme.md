## Server side
Models: **Editor, News, Post, Comment**

_Routing:_
### FOR USER
- / - news list 
- /:news/ - page of content, comments list

### FOR EDITOR
- /editor/registration
- /editor/login - if user not authorized
- /editor/posts  - list of editor's posts
- /editor/posts/:id/ - view/edit - and comments list (view/delete)

### FOR ADMIN
- /admin/login - if user not authorized
- /admin/  - list all news 
- /admin/posts  - list of all posts
- /admin/posts/:id/ - post view (view/edit/remove/confirm) comments(view/delete)
- /admin/editors/  - list of all editors / confirm rights of editor
