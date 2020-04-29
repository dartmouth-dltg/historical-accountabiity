<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit11dd1b110abe1569c18473b53e9598ff
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'SlowProg\\CopyFile\\' => 18,
        ),
        'L' => 
        array (
            'Log\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'SlowProg\\CopyFile\\' => 
        array (
            0 => __DIR__ . '/..' . '/slowprog/composer-copy-file',
        ),
        'Log\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit11dd1b110abe1569c18473b53e9598ff::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit11dd1b110abe1569c18473b53e9598ff::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
