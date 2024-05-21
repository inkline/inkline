import shell from 'shelljs';

shell.exec('npm run build');

shell.cp('package.json', 'lib');
shell.cd('lib');
shell.exec('npm pack');
