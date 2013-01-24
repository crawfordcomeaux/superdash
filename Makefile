FILES = \
node_modules \
public/js/jquery.js \
public/js/jquery.validate.js \
public/js/underscore.js \
public/js/backbone.js \
public/js/socket.io.js \
public/css/bootstrap \
public/js/bootstrap \
public/img/glyphicons-halflings.png \
public/img/glyphicons-halflings-white.png


install: $(FILES)

clean:
	rm -rf $(FILES)


node_modules: package.json
	npm install

public/js/jquery.js:
	curl http://code.jquery.com/jquery.js > $@

public/js/jquery.validate.js:
	curl https://raw.github.com/jzaefferer/jquery-validation/1.10.0/jquery.validate.js > $@

public/js/underscore.js:
	curl http://underscorejs.org/underscore.js > $@

public/js/backbone.js:
	curl http://backbonejs.org/backbone.js > $@

public/js/socket.io.js: node_modules/socket.io-client/dist/socket.io.js
	cp $< $@

public/css/bootstrap: node_modules/twitter-bootstrap/less
	cp -r $< $@

public/js/bootstrap: node_modules/twitter-bootstrap/js
	cp -r $< $@

public/img/glyphicons-halflings.png: node_modules/twitter-bootstrap/img/glyphicons-halflings.png
	cp -r $< $@

public/img/glyphicons-halflings-white.png: node_modules/twitter-bootstrap/img/glyphicons-halflings.png
	cp -r $< $@


.PHONY: install clean
