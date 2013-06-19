<?php

// Whether or not to concatenate JS, CSS, and templates,
// and minify JS and CSS.
define('MINIFY', false);
define('CONCATENATE', false);

// Path to webserver's docroot, WITHOUT trailing slash
define('WWW_DIR', realpath( null ));

// NOTE: Trailing space is important!!
// NOTE: DYLD_LIBRARY_PATH statement required to work around issue in MAMP stack
// see: http://stackoverflow.com/questions/278868/calling-java-from-php-exec
// define('MINIFY_COMMAND', 'export DYLD_LIBRARY_PATH=""; java -jar ' . WWW_DIR . '/server/bin/yuicompressor-2.4.7.jar ');
define('MINIFY_COMMAND', 'java -jar ' . WWW_DIR . '/server/bin/yuicompressor-2.4.7.jar ');

?>
