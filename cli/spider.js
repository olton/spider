#!/usr/bin/env -S node

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { termx, Screen, Cursor } from '@olton/terminal'
import { LOGO, FAIL, WEB } from '../src/constants.js'
import { processArgv, updateConfig } from '../src/config.js'
import { banner } from '../src/helpers/banner.js'
import { init, run } from '../src/app.js'
import report from '../src/report.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __root = dirname(__dirname)

const args = processArgv()
const startTime = Date.now()

try {
  const root = process.cwd()
  Screen.clear()
  banner()

  const target = args["_"]
  if (target.length === 0) {
    console.log(termx.error(` ${FAIL} Target is not specified! \n`))
    process.exit(1)
  }
  console.log(`${termx.cyan.write(`${WEB} Let's walk around the site:`)} ${termx.bold.whiteBright.write(target)}`)
  
  updateConfig(args)
  
  try {
    await fetch(target)
  } catch (error) {
    console.log(termx.error(`\n\n${FAIL}! Target ${target} is not reachable!\n\n`))
    process.exit(1)
  }

  console.log(`${termx.white.write(`${WEB} Checking attributes:`)} ${termx.bold.whiteBright.write(config.attr.join(', '))}`)
  
  
  global.__target = target
  
  await init()
  const result = await run(target)

  Cursor.show()
  Cursor.to(0, result.pos.y - 1)
  const endTime = Date.now()
  const duration = (endTime - startTime) / 1000
  Screen.clearDown();
  process.stdout.write(termx.gray.write(`-----------------------------------------------------------------\n`))
  process.stdout.write(termx.gray.write(`${LOGO} Spider finished in ${duration} seconds.\n`));
  process.stdout.write(termx.whiteBright.write(`${LOGO} Spider found ${termx.yellowBright.write(result.total)} links, ${termx.red.write(result.bad)} bad of them.\n`))

  if (result.bad >0) {
    report(result.bad_links)
  }

  process.stdout.write(termx.gray.write(`-----------------------------------------------------------------\n`))
  process.stdout.write(termx.green.write(`${LOGO} Scanning completed! Bye!\n\n`))
  
  process.exit(+result.bad > 0 ? 1 : 0)  
} catch (error) {
  process.stdout.write(termx.error(`\n${FAIL} Spider executing stopped with message: ${error.message}\``))
  if (args.verbose) {
    console.error(error.stack)
  }
  process.exit(1)
}