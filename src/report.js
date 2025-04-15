import fs from 'fs'
import { termx } from '@olton/terminal'
import { LOGO } from './constants.js'

export default (data) => {
  const hostname = new URL(global.__target).hostname
  if (config.dir && !fs.existsSync(config.dir)) {
    fs.mkdirSync(config.dir, { recursive: true })
  }
  const fileName = `${config.dir ? config.dir + "/" : ""}${config.name.replace('{time}', new Date().toLocaleTimeString)}`
  
  let bl = ``

  bl += `Report for: ${hostname}\n`
  
  for (const host in data) {
    if (data[host].length === 0) {
      continue
    }
    bl += `Page: ${host}\n`
    bl += `-----------------------------------------------------------------\n`
    for (const [attr, code, link, element] of data[host]) {
      bl += `[${attr}:${code}] ${element.replaceAll('\n', '')}\n`
    }
    bl += `\n\n`
  }
  fs.writeFileSync(fileName, bl, 'utf-8')

  process.stdout.write(termx.gray.write(`-----------------------------------------------------------------\n`))
  process.stdout.write(termx.gray.write(`${LOGO} Bad links wrote to file >> ${termx.bold.red.write(fileName)} <<\n`))
}