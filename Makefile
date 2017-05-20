.PHONY: test, build, setup, docs, install, clean, singletest, benchmark

##
#  use bash as shell
#
SHELL:=/bin/bash

###
# Current Year
#
YEAR:=$(shell date "+%Y")

##
#  root directory (Makefile location)
#
WORKING_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

##
#  default value for installdir (= working dir)
#
ifeq ($(INSTALLDIR),)
INSTALLDIR=$(WORKING_DIR)
endif

##
#  find all relevant sources (sources that end with .js)
#  and get their path relative to working dir
#
SOURCES_RELATIVE:= \
	$(shell cd $(WORKING_DIR) && find src -type f -iname '*.js')

##
#  save the relative sources to a new variable that holds al SOURCES
#  with absolute paths
#
SOURCES:= \
	$(foreach x, $(SOURCES_RELATIVE), $(WORKING_DIR)/$(x))

##
#  these are our "object"-files - the files that are transpiled from
#  es6 to es5
#
OBJECTS:= \
	$(foreach x, $(SOURCES_RELATIVE), $(WORKING_DIR)/build/$(x))

##
#  these are our "object"-files - the files that are transpiled from
#  es6 to es5
#
INSTALLED_OBJECTS:= \
	$(foreach x, $(shell cd $(WORKING_DIR)/src && find . -type f -iname '*.js'), $(INSTALLDIR)/lib/$(x)) \

##
#  This template has to be appended to all src files for Copyright purposes
#
define LICENSE
/*
 * This file is part of CoreWorker.
 *
 * CoreWorker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CoreWorker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with CoreWorker.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright $(YEAR) TeeAge-Beatz UG (haftungsbeschränkt)
 */

endef
export LICENSE

all: install

setup: $(WORKING_DIR)/setupfile

build: $(OBJECTS)
	@make -s $(WORKING_DIR)/build/src/lib

test: build
	$(WORKING_DIR)/node_modules/.bin/flow
	$(WORKING_DIR)/node_modules/.bin/istanbul cover --root $(WORKING_DIR)/build/src -x "**/__tests__/**" $(WORKING_DIR)/node_modules/.bin/_mocha $(shell find $(WORKING_DIR)/build/src -name "*Test.js") -- -R spec --require source-map-support/register
	$(WORKING_DIR)/node_modules/.bin/remap-istanbul -i $(WORKING_DIR)/coverage/coverage.json -o $(WORKING_DIR)/coverage/lcov-report -t html

docs: build
	$(WORKING_DIR)/node_modules/.bin/esdoc -c esdoc.json

install: docs test
	@make -s $(INSTALLED_OBJECTS)
	$(info Copied $(INSTALLED_OBJECTS) to $(INSTALLDIR))

clean:
	rm -rf $(WORKING_DIR)/build
	rm -rf $(WORKING_DIR)/docs
	rm -rf $(WORKING_DIR)/lib
	rm -rf $(WORKING_DIR)/coverage
	rm -rf $(WORKING_DIR)/bin
	rm -rf $(WORKING_DIR)/examples
	rm -rf $(WORKING_DIR)/setupfile

benchmark:
	@make -s $(BENCHMARKS)
	$(WORKING_DIR)/benchmark/benchmark


##
#  file to save setup status
#
$(WORKING_DIR)/setupfile:
	@echo "setup done" > $(WORKING_DIR)/setupfile

##
#  this targets are necessary to not always trigger a rebuild of
#  transpiled files, even if they exist. if the no-op is removed
#  this will trigger a rebuild too
#
$(WORKING_DIR)/src/%.js: $(WORKING_DIR)/License_Template
	@if ! grep -q "under the terms of the GNU General Public License" $@;then \
		cp $< "$@.tmp"; \
		cat $@ >> "$@.tmp"; \
		rm $@; \
		mv "$@.tmp" "$@"; \
	fi

##
#  target to create build/src. Used as precondition
#  for linking a ne dir lib recursively to src
#
$(WORKING_DIR)/build/src:
	mkdir -p $@

##
# links a directory "lib" located in build/src to src.
# Used to be able to test binaries, because they use
# the lib after compiling has finished
#
$(WORKING_DIR)/build/src/lib: $(WORKING_DIR)/build/src
	ln -s $< $@

##
#  every transpiled file requires a matching source file
#  to be created.
#
$(WORKING_DIR)/build/src/%.js: $(WORKING_DIR)/src/%.js $(WORKING_DIR)/setupfile
	mkdir -p $(dir $@)
	$(WORKING_DIR)/node_modules/.bin/eslint $<
	$(WORKING_DIR)/node_modules/.bin/babel $< --out-file $@ --source-maps --presets es2015 --plugins babel-plugin-syntax-flow,transform-flow-strip-types,transform-runtime,transform-class-properties

##
#  every destination file needs a transpiled
#  source that is tested
#
$(INSTALLDIR)/lib/%.js: $(WORKING_DIR)/build/src/%.js
	mkdir -p $(dir $@)
	cp $< $@

##
#  Writes the Header in a template file
#
$(WORKING_DIR)/License_Template:
	@echo "$$LICENSE" > $@
