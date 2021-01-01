init(){
	read -r -p "Are you sure? [y/N] " response
	response=${response,,}    # tolower
	if [[ "$response" =~ ^(yes|y)$ ]]
	then
		current_dir=${PWD##*/}
		main_dir="$current_dir/src"
		cd ..

		read -r -p "Start migrate files? [y/N] " response
		response=${response,,}    # tolower
		if [[ "$response" =~ ^(yes|y)$ ]]
		then
			migrate_files
		fi

		read -r -p "Start install npm package? [y/N] " response
		response=${response,,}    # tolower
		if [[ "$response" =~ ^(yes|y)$ ]]
		then
			npm_install
		fi

		read -r -p "Start install npm package? [y/N] " response
		response=${response,,}    # tolower
		if [[ "$response" =~ ^(yes|y)$ ]]
		then
			composer_install
		fi

	else
		echo BYE

	fi
}

migrate_files(){

	echo ~~~~~~~~~~~~~~~~~~~~~~~~~

	main_path="app"
	cp $main_dir/$main_path/ . -r
	echo \# $main_path ...

	main_path="resources"
	cp $main_dir/$main_path/ . -r
	echo \# $main_path ...

	main_path="routes"
	cp $main_dir/$main_path/ . -r
	echo \# $main_path ...

	main_path=".env.example"
	cp $main_dir/$main_path .
	echo \# $main_path ...

	main_path="webpack.mix.js"
	cp $main_dir/$main_path .
	echo \# $main_path ...

	echo ~~~~~~~~~~~~~~~~~~~~~~~~~
}

npm_install(){
	echo installing npm package ...
	npm i vue@2
	npm install @mdi/font
	npm install vuetify@2
	npm install deepmerge -D
	npm install vue-router@3
	npm i vue-axios@2
	npm i @websanova/vue-auth@3
}

composer_install(){
	echo installing composer package ...
	composer require barryvdh/laravel-debugbar --dev
}

###################################################
# init
ECHO ++++++++++++++++++++++++++
ECHO "     W E L C O M E     "
ECHO ++++++++++++++++++++++++++
init