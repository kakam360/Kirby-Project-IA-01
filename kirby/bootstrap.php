<?php

if (
	(
		defined('KIRBY_PHP_VERSION_CHECK') !== true ||
		KIRBY_PHP_VERSION_CHECK !== false
	) && (
		version_compare(PHP_VERSION, '8.2.0', '>=') === false ||
		version_compare(PHP_VERSION, '8.6.0', '<')  === false
	)
) {
	die(include __DIR__ . '/views/php.php');
}

if (is_file($autoloader = dirname(__DIR__) . '/vendor/autoload.php')) {
	/**
	 * Use the Composer autoloader from the parent directory
	 * if Kirby is installed as a dependency
	 */
	include $autoloader;
} elseif (is_file($autoloader = __DIR__ . '/vendor/autoload.php')) {
	/**
	 * Fall back to the local autoloader if that exists
	 */
	include $autoloader;
}
/**
 * If neither one exists, don't bother searching;
 * it's a custom directory setup and the users need to
 * load the autoloader themselves
 */
