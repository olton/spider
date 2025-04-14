import fs from 'fs'
import { termx } from '@olton/terminal'
import { LOGO } from './constants.js'

export default (data) => {
  const hostname = new URL(global.__target).hostname
  const fileName = `${hostname}-bad_links.txt`
  
  let bl = ``
  
  for (const host in data) {
    if (data[host].length === 0) {
      continue
    }
    bl += `\nTarget: ${host}\n`
    bl += `-----------------------------------------------------------------\n`
    for (const [attr, link] of data[host]) {
      bl += `[${attr}] ${link}\n`
    }
    bl += `\n\n`
  }
  fs.writeFileSync(fileName, bl, 'utf-8')

  process.stdout.write(termx.gray.write(`-----------------------------------------------------------------\n`))
  process.stdout.write(termx.gray.write(`${LOGO} Bad links wrote to file >> ${termx.bold.red.write(fileName)} <<\n`))
}