#! /usr/bin/env node 

const readline = require('readline')
const fs = require('fs')
const ProgressBar = require('progress')
const chalk = require('chalk')
const program = require('commander')
const moment = require('moment')

program
  .version('0.0.1')
  .option('-f, --file [filename]', 'Add file [filename]', null)
  .option('--start [startDateTimeRange]', 'Start date time range', null)
  .option('--end [endDateTimeRange]', 'End date time range', null)
  .parse(process.argv)


if (program.file !== null) {
  
  let fileSize = fs.statSync(program.file).size
  let lineCount = 0

  let startDateTimeRange, endDateTimeRange 

  if (program.start !== null) {
    startDateTimeRange = moment(program.start, "HH:MM:SS MM-DD-YYYY")
  }

  if (program.end !== null) {
    endDateTimeRange = moment(program.end, "HH:MM:SS MM-DD-YYYY")
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(program.file)
  })

  let barOpts = {
    width: 20,
    total: fileSize,
    clear: true
  }
  let bar = new ProgressBar('reading [:bar] :percent', barOpts)

  rl.on('line', (line) => {    
    
    /**
     * Check to see if log entry falls within the Start and End DateTime
     * If both the Start and End DateTime is supplied show all log entries that fall between that range
     * If only the Start DateTime is suppplied, show all log entries after the Start DateTime
     * If only the End DateTime is supplied, show all log entries before the End DateTime
     */
    
    if (startDateTimeRange === undefined && endDateTimeRange === undefined) {
      printColoredLines(line)
    } else {
      let dateTimeStamp = moment(getDateTimestampFromLine(line), "DD/MMM/YYYY :HH:mm:ss Z")
      if (startDateTimeRange !== undefined && endDateTimeRange !== undefined) {
        if (startDateTimeRange <= dateTimeStamp && endDateTimeRange > dateTimeStamp) {
          printColoredLines(line)
        }  
      } else if (endDateTimeRange === undefined) {
        if (startDateTimeRange <= dateTimeStamp) {
          printColoredLines(line)
        }
      } else if (startDateTimeRange === undefined) {
        if (endDateTimeRange > dateTimeStamp) {
          printColoredLines(line)
        }
      } 
    }

    // lineCount += 1
    bar.tick(line.length)
  })

  rl.on('close', () => {
    process.exit(0)
  })

} else {
  program.outputHelp()
}

/**
 * Parses a line in the server log and returns the time 
 */
function getDateTimestampFromLine(line) {
  let lineStreamArray = line.split(" ")
  let dateTimeStamp = lineStreamArray[3] + " " + lineStreamArray[4]

  // Remove square brackets from date timestamp 
  dateTimeStamp = dateTimeStamp.substring(1, dateTimeStamp.length - 1)
  return dateTimeStamp
}

/**
 * Print out a line as a certain color based on HTTP Status
 * HTTP 200 - green
 * HTTP 400 - red
 */

function printColoredLines(line) {

  let http404 = 'HTTP/1.1" 404'
  let http200 = 'HTTP/1.1" 200'

  if (line.includes(http404)) {
    console.log(chalk.bold.red(line))
  } else if (line.includes(http200)) {
    console.log(chalk.bold.green(line))
  }
}

