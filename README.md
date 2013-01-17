superdash
=========

Social Media Dashboard for Super Bowl Press Room

# Feature Ideas 
## MVP
- Hide negative content
- Heatmap of checkins
- Heatmap of social media posts
- Event schedule
- Updates to schedule
- Official NOLA feeds
- Correspondence between NOLA and public
- Word cloud of trending topics
- Public Service Announcements
- Loading screen showing interest data, ie. tweet in NOLA with most RTs or most discussed upcoming event



# Overview
Express3 app with mongoose, passport, mongo sessions, shared server/client jade templates, twitter bootstrap LESS, socket.io, and separate routes for UI and API functionality

# Setup
Just clone the repo and run ```chmod +x setup.sh && ./setup.sh``` from your terminal.

# Configuration
```config/index.js``` is designed to automatically require and export a configuration file that is named according to your ```NODE_ENV``` environment variable, e.g., ```config/development.js``` or ```config/production.js```.

# Response Caching
While there is no caching out of the box, all user-specific UI elements (except in the ```/me``` routes) are handled with an AJAX call after the page loads. Continuing to keep user-specific UI out of the initial page load will make the application more caching-friendly when the time comes.

# Widget-Socket relationship
Current implementation is that widgets are defined by a room name. When a user logs in, they receive a loading screen while the client subscribes to all rooms in their profile config. When a client joins a room, a hash of the widget's codebase is emitted to that client (or emitted to the widget's room, depending on how long the last emit was). If the code hash doesn't match the cached hash, the client pulls the codebase for that widget from the server. 

# Namespaces
user and admin are the only two namespaces, currently
