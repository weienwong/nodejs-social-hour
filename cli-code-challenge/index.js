#! /usr/bin/env node 

const readline = require('readline')
const fs = require('fs')
const ProgressBar = require('progress')
const chalk = require('chalk')
const program = require('commander')

/**
 * Parses command line arguments
 * In this case stores the filename as a command line argument
 */
program
  .version('0.0.1')
  .option('-f, --file [filename]', 'Add file [filename]', null)
  .parse(process.argv)


if (program.file !== null) {

  /**
   * Will parse the file if a proper value has been passed in
   */
  
  let fileSize = fs.statSync(program.file).size
  let lineCount = 0

  let http404 = 'HTTP/1.1" 404'
  let http200 = 'HTTP/1.1" 200'

  let http404Count = 0
  let http200Count = 0

  const rl = readline.createInterface({
    input: fs.createReadStream(program.file)
  })

  let barOpts = {
    width: 20,
    total: fileSize,
    clear: true
  }
  let bar = new ProgressBar('reading [:bar] [:percent]', barOpts)

  rl.on('line', (line) => {    
    
    if (line.includes(http404)) {
      http404Count += 1
    } else if (line.includes(http200)) {
      http200Count += 1
    }

    lineCount++
    bar.tick(line.length)

  })

  rl.on('close', () => {

    bar.terminate()
    
    console.log(chalk.cyan('Finished reading log file!'))
    console.log(chalk.cyan(`Total lines read ${lineCount}`))
    console.log(chalk.red(`${http404} count: ${http404Count}`))
    console.log(chalk.green(`${http200} count: ${http200Count}`))
    
    process.exit(0)
  })

} else {
  program.outputHelp()
}

