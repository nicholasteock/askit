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
	// Bootstrap 2.3.2 css
	//'components/bootstrap/css/bootstrap.css',
	//'components/bootstrap/css/bootstrap-responsive.css',

	// Bootstrap 3 css
	'components/bootstrap3/css/bootstrap.min.css',
	'components/font-awesome/css/font-awesome.css',
	'components/mathquill/mathquill.css',
	
	'css/index.css',
	'css/ask.css',
	'css/answer.css',
	'css/dashboard.css',
	'css/qnGallery.css',
	'css/ansGallery.css',
	'css/profile.css',
	'css/viewAnswer.css',
	'css/yourAnswer.css',
	'css/statistics.css',
);

echo formatCss("ai", $aiCss)."\n";
?>
</head>
<body>
<div id="ai-header">
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="navbar-header">
			<a id="logo" class="navbar-brand" href="#/dashboard"><img src="img/askit.png"></a>
		</div>
		<div class="collapse navbar-collapse navbar-ex1-collapse">
			<ul id="menu-main-nav" class="nav navbar-nav">
				<li>
					<a id="menu-dashboard" class="selected" href="#/dashboard">
						<i class="icon-home icon-large"> </i>
						<span> Dashboard</span>
					</a>
				</li>
				<li>
					<a id="menu-ask" href="#/ask">
						<i class="icon-bullhorn"> </i>
						<span> Ask!</span>
					</a>
				</li>
				<li>
					<a id="menu-answer" href="#/answer">
						<i class="icon-star-empty"> </i>
						<span> Answer</span>
					</a>
				</li>
				<li>
					<a id="menu-practice" href="#/practice">
						<i class="icon-edit"> </i>
						<span> Practice</span>
					</a>
				</li>
				<li>
					<a id="menu-hire" href="#/hire">
						<i class="icon-group"> </i>
						<span> Hire</span>
					</a>
				</li>
			</ul>
			<ul id="ai-user-info-nav" class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">
						Settings <b class="caret"></b>
					</a>
					<ul class="dropdown-menu pull-right">
						<li><a href="#/profile"><i class="icon-user"> </i> Profile</a></li>
						<li><a href="#/yourQuestions"><i class="icon-user"> </i> Your Questions</a></li>
						<li><a href="#/yourAnswers"><i class="icon-user"> </i> Your Answers</a></li>
						<li><a href="#/yourStatistics"><i class="icon-user"> </i> Statistics</a></li>
						<li class="divider"></li>
						<li><a href="javascript:" onclick="app.signout();"><i class="icon-user"> </i> Sign Out</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</div>
	
<div id="ai-body">
	<div id="ai-stage" class="col-lg-offset-1 col-lg-10">
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

	// Bootstrap 3 js
	'components/bootstrap3/js/bootstrap.min.js',

	// JMVC Framework
	'components/jmvc3.2.4/jquerymx-3.2.custom.js',

	// Lodash Utility
	'components/lodash/lodash.min.js',

	// Mathquill plugin
	'components/mathquill/mathquill.min.js',
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
	'askit/screens/qnGallery/qnGallery.js',
	'askit/screens/ansGallery/ansGallery.js',
	'askit/screens/viewAnswer/viewAnswer.js',
	'askit/screens/yourAnswer/yourAnswer.js',
	'askit/screens/profile/profile.js',
	'askit/screens/statistics/statistics.js',
	'askit/screens/lfkeong/lfkeong.js',
	
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
	// Modal views
	'modals/answer/answer_question_modal_view.html',
	'modals/answer/report_question_modal_view.html',

	// Common views
	'askit/screens/common/common_stage.html',

	// Homepage views
	'askit/screens/homepage/homepage_view.html',
	
	// Dashboard views
	'askit/screens/dashboard/dashboard_view.html',
	'askit/screens/dashboard/dashboard_question_item_view.html',
	'askit/screens/dashboard/dashboard_answer_item_view.html',
	
	// Question Gallery views
	'askit/screens/qnGallery/qnGallery_view.html',
	'askit/screens/qnGallery/qnGallery_question_item_view.html',
	
	// Answer Gallery Views
	'askit/screens/ansGallery/ansGallery_view.html',
	'askit/screens/ansGallery/ansGallery_answer_item_view.html',

	// Ask views
	'askit/screens/ask/ask_view.html',
	'askit/screens/ask/level_list_view.html',
	'askit/screens/ask/subject_list_view.html',
	'askit/screens/ask/topic_list_view.html',
	
	// Answer views
	'askit/screens/answer/answer_qn_item_view.html',
	'askit/screens/answer/no_qn_view.html',
	
	// Practice views
	'askit/screens/practice/practice_view.html',
	
	// Hire views
	'askit/screens/hire/hire_view.html',

	// View Answer views
	'askit/screens/viewAnswer/viewAnswer_view.html',
	'askit/screens/viewAnswer/viewAnswer_question_view.html',
	'askit/screens/viewAnswer/viewAnswer_answer_view.html',
	
	// Your Answer views
	'askit/screens/yourAnswer/yourAnswer_view.html',
	'askit/screens/yourAnswer/yourAnswer_question_view.html',
	'askit/screens/yourAnswer/yourAnswer_answer_view.html',
	'askit/screens/yourAnswer/yourAnswer_stats_view.html',

	// Profile views
	'askit/screens/profile/profile_view.html',

	// Statistics views
	'askit/screens/statistics/statistics_view.html',
	'askit/screens/statistics/statistics_qn_statistics_view.html',
	'askit/screens/statistics/statistics_ans_statistics_view.html',

	// LFKEONG PRACTICE VIEWS
	'askit/screens/lfkeong/lfkeong_view.html',
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
