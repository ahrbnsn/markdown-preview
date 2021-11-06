// good insiration here:
// https://github.com/vercel/next.js/blob/canary/packages/create-next-app/create-appathUtils.ts
// lots about if the directory is readable, etc
//
// use inquirer pachage?
//
// https://github.com/sindresorhus/cpy
//
//
const chokidar = require('chokidar');
const { program } = require('commander');
const cpy = require('cpy');
const pathUtils = require('path');
const fs = require('fs');

const pagesDirectory = pathUtils.join(__dirname, '..', 'pages', 'synced');
const absolutePathOf = (location) => {
  return pathUtils.isAbsolute(location)
    ? location
    : pathUtils.join(process.cwd(), location);
};

program.option(
  '-w, --watchLocation <file or directory>',
  'which file or folder to watch'
);
program.parse(process.argv);

const { watchLocation } = program.opts();
const syncLocation = absolutePathOf(watchLocation);

process.on('SIGINT', () => {
  console.log('shutting down');
  console.log(
    "removing synced files because one should always clean up after one's self"
  );
  fs.rmSync(pagesDirectory, { recursive: true, force: true });
  process.exit();
});

// the "ignored" option when setti+ up the watcher
// stops the tree traversal as soon as it hits a
// positive result so we can't use it to filter out
// everything but markdown files.
//
// https://github.com/paulmillr/chokidar/issues/628#issuecomment-320995544

// if the location has an extension, use it. otherwise, do some md globbing
const watchGlob = pathUtils.extname(syncLocation)
  ? syncLocation
  : syncLocation + '/**/*.md';

const syncLocationDirectory = pathUtils.parse(syncLocation).dir;
const watcher = chokidar.watch(watchGlob, {
  cwd: pathUtils.parse(syncLocation).dir,
});

const watchedFiles = watcher.getWatched();
const timestamp = new Date().toISOString();
const createBackupIfFileAlreadyExists = async (path) => {
  const targetLocation = pagesDirectory + `/${path}`;
  const fileExists = await fs.access(
    targetLocation,
    fs.constants.F_OK,
    async (err) => {
      if (!err) {
        console.log(`${path} already exists. creating a copy`);
        await cpy(targetLocation, pagesDirectory + `/${timestamp}-backup/`, {});
      }
    }
  );
};

console.log(`watching ${watchedFiles}`);
watcher.on('add', async (path) => {
  console.log(`${path} added`);

  await createBackupIfFileAlreadyExists(path);

  await cpy(
    pathUtils.parse(syncLocation).dir + `/${path}`,
    pagesDirectory + '/' + pathUtils.parse(path).dir
  );

  const link = `${pathUtils.parse(path).dir}/${pathUtils.parse(path).name}/`;

  console.log(`Open http://localhost:3000/synced/${link}`);
});

watcher.on('change', async (path) => {
  console.log(`${path} changed`);
  await cpy(
    pathUtils.parse(syncLocation).dir + `/${path}`,
    pagesDirectory + '/' + pathUtils.parse(path).dir
  );
});

// ignored: /(^|[\/\\])\../, // ignore dotfiles
// const watcher = chokidar.watch(syncLocations, {
// ignored: /(^|[\/\\])\../, // ignore everything but markdown
// persistent: true,
// })

// fs.copyFile(source, destination), (err
// watcher.on('add', path const fs = require('fs');>
//
//
console.log('syncing folder');
