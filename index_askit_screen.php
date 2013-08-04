<!DOCTYPE html>
<head>
	<title>AskIt!</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content>
	<meta name="author" content>
	<link href="img/favicon.png" rel="icon">
<?php
require_once('php/config.php');

$aiCss = array(
	//bootstrap css
	'components/bootstrap/css/bootstrap.css',
	'components/bootstrap/css/bootstrap-responsive.css',
	'components/font-awesome/css/font-awesome.css',
	
	'css/index.css',
	'css/answer.css',
	'css/dashboard.css',
);

echo formatCss("ai", $aiCss)."\n";
?>
</head>
<body>
<div id="ai-header">
	<div class="navbar navbar-inverse navbar-static-top">
		<div class="navbar-inner">
			<div class="container">
				<a id="logo" class="brand" href="#/dashboard"><img src="img/askit.png"></a>
				<ul id="menu-main-nav" class="nav navbar-static-top ai-main-nav">
					<li class="divider-vertical"></li>
					<li>
						<a id="menu-dashboard" href="#/dashboard">
							<i class="icon-home icon-large"> </i>
							<span> Dashboard</span>
						</a>
					</li>
					<li class="divider-vertical"></li>
					<li>
						<a id="menu-ask" href="#/ask">
							<i class="icon-bullhorn"> </i>
							<span> Ask!</span>
						</a>
					</li>
					<li class="divider-vertical"></li>
					<li>
						<a id="menu-answer" href="#/answer">
							<i class="icon-star-empty"> </i>
							<span> Answer</span>
						</a>
					</li>
					<li class="divider-vertical"></li>
					<li>
						<a id="menu-practice" href="#/practice">
							<i class="icon-edit"> </i>
							<span> Practice</span>
						</a>
					</li>
					<li class="divider-vertical"></li>
					<li>
						<a id="menu-hire" href="#/hire">
							<i class="icon-group"> </i>
							<span> Hire</span>
						</a>
					</li>
					<li class="divider-vertical"></li>
				</ul>
				<ul class="nav pull-right" id="ai-user-info-nav">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown">
							Settings
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu pull-right">
							<li><i class="icon-user"> </i> Profile</li>
							<li><i class="icon-user"> </i> Your Questions</li>
							<li><i class="icon-user"> </i> Your Answers</li>
							<li><i class="icon-user"> </i> Statistics</li>
							<li class="divider"></li>
							<li><a href="javascript:" onclick="app.signout();"><i class="icon-user"> </i> Sign Out</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
	
<div id="ai-body" class="container-fluid">
	<div id="ai-stage" class="container">
	</div>
</div>
	
<!-- TODO: Footer does not flow with scrolling
<div id="ai-footer" class="">
	<span>AskIt! Copyright &copy; 2013 - Nicholas Teo</span>
</div>
-->
<script>window.routes = {};</script>
<?php
$libJs = array(
	//Latest jQuery not compatible. Strange.
	//'components/jquery-1.9.1.min.js',
	'components/jquery-1.7.2.min.js',
	'components/bootstrap/js/bootstrap.js',
	'components/jmvc3.2.4/jquerymx-3.2.custom.js',
	'components/lodash/lodash.min.js',
);

$appJs = array(
	'askit/screen.js',
	
	//Models
	'models/user.js',
	'askit/models/question.js',
	'askit/models/answer.js',
	
	//Screens
	'askit/screens/homepage/homepage.js',
	'askit/screens/dashboard/dashboard.js',
	'askit/screens/ask/ask.js',
	'askit/screens/answer/answer.js',
	'askit/screens/practice/practice.js',
	'askit/screens/hire/hire.js',
	
	//Modals
	'modals/modal.js',
	'modals/answer/answer_question_modal.js',
	'modals/answer/report_question_modal.js',
);

array_push( $appJs,
	'askit/askit-app.js',
	'application_routing_helper.js',
	'application.js'
);

$aiHTML = array(
	//Modal views
	'modals/answer/answer_question_modal_view.html',
	'modals/answer/report_question_modal_view.html',

	//Common views
	'askit/screens/common/common_stage.html',

	//Homepage views
	'askit/screens/homepage/homepage_view.html',
	
	//Dashboard views
	'askit/screens/dashboard/dashboard_view.html',
	'askit/screens/dashboard/dashboard_question_item_view.html',
	'askit/screens/dashboard/dashboard_answer_item_view.html',
	
	//Ask views
	'askit/screens/ask/ask_view.html',
	'askit/screens/ask/subject_list_view.html',
	'askit/screens/ask/topic_list_view.html',
	
	//Answer views
	'askit/screens/answer/answer_qn_item_view.html',
	'askit/screens/answer/no_qn_view.html',
	
	//Practice views
	'askit/screens/practice/practice_view.html',
	
	//Hire views
	'askit/screens/hire/hire_view.html',
	
);

echo formatJs("lib", $libJs)."\n";
echo formatJs("app", $appJs)."\n";

include(formatTemplate("ai", $aiHTML));

function getFullDir($file){
	if(substr($file, 0, 1) == '/') {
		return WWW_DIR.$file;
	}
	else{
		return WWW_DIR.'/'.$file;
	}
}

function formatJs($name, $files, $minify=true){
	if( !CONCATENATE ) {
		$out = array();
		$out[] = '<!-- '.$name.'.js -->';
		foreach ($files as $file) {
			$out[] = '<script type="text/javascript" src="' . $file . '"></script>';
		}
		$out = implode("\n", $out);
	}
	else {
		$mtime = 0;
		$maxtime = 0;
		
		//Find most recently updated file and use that to generate merged and minified file names.
		foreach( $files as $file ) {
			$mtime = filemtime(getFullDir($file));
			if($mtime > $maxtime){
				$maxtime = $mtime;
			}
		}
		$name .= '-' . date('YmdHis', $maxtime);
		$mergedName = 'js/bin/' . $name . '.merged.js';
		$minifiedName = 'js/bin/' . $name . '.min.js';
		
		//If the minified file doesn't exist, we create it.
		if( !file_exists(getFullDir($minifiedName)) ) {
			if( !file_exists(getFullDir($mergedName)) ) {
				$content = '';
				foreach ($files as $file) {
					$content .= aiReadFile(getFullDir($file))."\n";
				}
				aiWriteFile(getFullDir($mergedName), $content);
			}
			if( MINIFY ) {
				exec(MINIFY_COMMAND . getFullDir($mergedName) . ' -o ' .getFullDir($minifiedName));
			}
		}
		if( MINIFY ) {
			$out = '<script type="text/javascript" src="' . $minifiedName . '"></script>';
		}
		else {
			$out = '<script type="text/javascript" src="' . $mergedName . '"></script>';
		}
	}
	return $out . "\n";
}

function formatCss($name, $files, $minify=true){
	if( !CONCATENATE ) {
		$out = array();
		$out[] = '<!-- ' . $name . '.css -->';
		foreach ($files as $file) {
			$out[] = '<link rel="stylesheet" type="text/css" href ="' . $file . '">';
		}
		$out = implode("\n", $out);
	}
	else {
		$mtime = 0;
		$maxtime = 0;
		
		//Find most recently update file and use that to generate merged and minified file names.
		foreach ($files as $file) {
			$mtime = filemtime(getFullDir($file));
			if($mtime > $maxtime) {
				$maxtime = $mtime;
			}
		}
		$name .= '-' . date('YmdHis', $maxtime);
		$mergedName = 'css/bin/' .$name . '.merged.css';
		$minifiedName = 'css/bin/' . $name . '.min.css';
		
		if( !file_exists(getFullDir($minifiedName)) ) {
			if( !file_exists(getFullDir($mergedName)) ) {
				$content = '';
				foreach ($files as $file) {
					$content .= aiReadFile(getFullDir($file));
				}
				aiWriteFile(getFullDir($mergedName), $content);
			}
			if( MINIFY ) {
				exec( MINIFY_COMMAND . getFullDir($mergedName) . ' -o ' . getFullDir($minifiedName));
			}
		}
		if( MINIFY ) {
			$out = '<link rel="stylesheet" type="text/css" href="' . $minifiedName . '">';
		}
		else {
			$out = '<link rel="stylesheet" type="text/css" href="' . $mergedName . '">';
		}
	}
	return $out . "\n";
}

function formatTemplate($name, $files) {
	$mtime = 0;
	$maxtime = 0;
	
	//Find most recently update file and use that to generate merged and minified file names.
	foreach ($files as $file) {
		$mtime = filemtime(getFullDir($file));
		if( $mtime > $maxtime ) {
			$maxtime = $mtime;
		}
	}
	$name .= '-' . date('YmdHis', $maxtime);
	$mergedName = 'templates/bin/' . $name . '.merged.html';
	
	if( !file_exists(getFullDir($mergedName)) ) {
		$content = '<!-- Here come the templates -->';
		foreach ($files as $file) {
			$id = str_replace("/", "_", $file);
			$id = str_replace(".html", "", $id);
			$content .= "\n\n";
			$content .= '<script type="text/ejs" id="' . $id . '">';
			$content .= aiReadFile(getFullDir($file));
			$content .= '</script>';
		}
		aiWriteFile(getFullDir($mergedName), $content);
	}
	return $mergedName;
}

function aiReadFile($fileName) {
	$handle = fopen($fileName, "r");
	$contents = fread($handle, filesize($fileName));
	fclose($handle);
	return $contents;
}

function aiWriteFile($fileName, $someContent, $overwrite=true) {
	$option = $overwrite ? 'w' : 'a';
	if( !$handle=fopen($fileName, $option)) {
		throw new Exception("Cannot open file (" . $filename .")");
	}
	if( fwrite($handle, $someContent) === FALSE) {
		throw new Exception("Cannot write to file (" . $fileName . ")");
	}
	fclose($handle);
}
?>
<script>
$(function() {
	var app = new Askit.Application();
	app.currentUser = new User( <?php echo $userInfo; ?> );
	window.app = app;
	app.run();
});
</script>
</body>
