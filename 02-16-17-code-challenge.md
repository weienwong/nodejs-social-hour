# CLI Code Challenge

The challenge is to author a Command Line Interface(CLI) tool for Node.js. Start at level 1 and progress as far as you can with in the time limit. We will be building a CLI tool to parse log files.

### Level 1
Hello World

Begin by setting up your package by running `npm init`. Then we can create our first script `index.js` and add a hello world with an interpreter directive(_it will be the first line_).

```
#! /usr/bin/env node
console.log('Hello World')
```

Go ahead and test this by running. `node index.js

Once we have our script setup the next step is to make it available on our machine. Now there are a few ways this can be acheived. Ultimately what we need to do is ensure our script is executable and available in our system `$PATH` variable. Fortunately for use we can use npm to make this very easy.

Start by telling npm the name of your script using the `bin` property of our `package.json`

```
 "bin": {
  	"cli-challenge": "./index.js"
  },
```

Then use the `npm link` command. After running this command you can see it created a symlink to our global npm module folder which is already available on our `$PATH`.

You should now be able to run `cli-challenge` in your terminal and see the results of your "hello world".


### Level 2
Input/Output

The command line uses `stdin`(Standard In), `stdout`(Standard Out), and `stderr`(Standard Error). These interfaces allow us to read and write to the command line.

Luckily for us Node.js exposes these via the `process` and implements them as Streams. It also provides the [`readline` package](https://nodejs.org/api/readline.html) which provides an interface for reading from Streams.

Let's update our script to use this package.

```
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```

Now test your script again.

### Level 3
Command Line Options

Now let's get down to it! Since we are building a log parsing cli tool we will need a option for our tool to tell us where are logs are located. This level you need to add the `path` parameter to your script. How you choose to accomplish this is up to you, there is more than one way.

The test to pass this level is you should be able to run this command.

`cli-challenge --path=/var/log/system.log`

And recieve the line count.

_Bonus points: add a `--help` option which shows you the available options and commands with explanations of how to use them._

### Level 4
Progress Bar

Now if we have a very large log file this could take awhile. So let's add some communication to our users of our parsing progress. This level you need to add a progress bar that displays on the command line while parsing takes place.


