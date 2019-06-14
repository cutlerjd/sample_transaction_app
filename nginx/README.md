## Nginx image

You'll see in the nginx.conf file where it's set up to allow for `try_files` to allow Vue single page apps to use proper browser history.

The `rewrite` allows for the api docker image to not care what version of the api it is, and just another entry here could have a different docker image running alongside that is now api/v2 if needed.