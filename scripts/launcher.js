const { argv } = require('yargs');
const { createLaunch } = require('process-launch');
const { logger } = require('jege/server');

const log = logger('[monorepo-aktion]');

const processDefinitions = {
  sandbox: [
    'node',
    [
      './scripts/launch.js',
      ...argv._,
    ],
    {
      cwd: './packages/sandbox',
      stdio: 'inherit',
    },
  ],
};

function launcher() {
  log('launcher(): argv: %j', argv);

  const launch = createLaunch({
    processDefinitions,
  });

  if (argv.process) {
    launch({
      process: argv.process,
    });
  } else {
    launch();
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
