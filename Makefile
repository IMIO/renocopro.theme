#
# Makefile
# AuroreMariscal, 2019-01-17 14:03
#
#!/usr/bin/make
#
grunt-dev:
	npm init
	npm install grunt
	npm install autoprefixer
	npm install grunt-browser-sync grunt-contrib-watch grunt-contrib-less grunt-postcss
	grunt compile

bin/pip:
	virtualenv-2.7 .

build-dev: bin/pip
	ln -f -s dev.cfg buildout.cfg
	bin/pip install -I -r requirements.txt
	bin/buildout
	make grunt-dev

build-prod: bin/pip
	ln -f -s prod.cfg buildout.cfg
	bin/pip install -I -r requirements.txt
	bin/buildout
