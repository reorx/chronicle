HTML = $(shell find source/ -name '*.jade' |\
	   sed -e 's/source\//build\//g' -e 's/\.jade/\.html/g')

CSS = $(shell find source/styl/ -name '*.styl' |\
	  sed -e 's/source\/styl\//build\/css\//g' -e 's/\.styl/\.css/g')

JS = $(shell find source/js/ -name '*.js' | sed -e 's/source\//build\//g')

DIRS = build/css build/js build/

all: $(DIRS) $(HTML) $(CSS) $(JS)

build/css build/js: build
	mkdir $@

build/:
	mkdir build

build/%.html: source/%.jade
	jade < $< > $@

build/css/%.css: source/styl/%.styl
	stylus < $< > $@

build/js/%.js: source/js/%.js
	dirname $@ | xargs ls || dirname $@ | xargs mkdir
	cp $< $@

clean:
	rm -rf build/
