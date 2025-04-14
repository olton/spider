import {Activity} from '@olton/progress'
import { termx, Cursor, Screen } from "@olton/terminal"

const 
  bad_links = {}, 
  processed_links = []

let 
  total_links = 0,
  startLineForBadLinks = 0,
  activity = null

const getBadLinksCount = () => {
  let count = 0
  for (const host in bad_links) {
    count += bad_links[host].length
  }
  return count
}

export const init = async () => {
  activity = new Activity({
    color: 'yellowBright',
    messageColor: 'whiteBright',
    type: 'dots',
    spaceBefore: 1,
    spaceAfter: 1,
    cursor: false,
  })

  await activity.here() 

  startLineForBadLinks = +activity.position.y + 1
  
  Cursor.to(0, startLineForBadLinks + 1)
  process.stdout.write(`\r${termx.gray.write("Total links checked:")} ${termx.yellowBright.write(total_links)}`)
  Cursor.to(0, startLineForBadLinks + 2)
  process.stdout.write(`\r${termx.gray.write("Bad links found    :")} ${termx.yellowBright.write(getBadLinksCount())}`)
}

export const run = async (target) => {
  if (!bad_links[target]) {
    bad_links[target] = []
  }
  const pageSource = await fetch(target).then(res => res.text())

  const links = []
  let regex, match

  for (const attr of global.config.attr) {
    regex = new RegExp(`${attr}="([^"]*)"`,'g')
    while ((match = regex.exec(pageSource)) !== null) {
      const link = match[1]
      links.push([attr,link])
    }
  }
  // const linkRegex = /href="([^"]*)"/g
  // let match

  // Extract all links from the page

  for (const [attr, link] of links) {
    const url = new URL(link, target)
    let {
      hash, 
      host, 
      hostname, 
      href, 
      origin, 
      pathname, 
      port, 
      protocol, 
      search, 
    } = url

    if (processed_links.includes(href) || (href.startsWith('http') && href.includes(target) === false)) {
      continue
    }

    Cursor.to(0, startLineForBadLinks + 1)
    process.stdout.write(`\r${termx.gray.write("Total links checked:")} ${termx.yellowBright.write(total_links)}`)

    processed_links.push(href)
    total_links++

    const size = Screen.size().x - 16
    let _link = href.replace(global.__target, '')
    if (_link.length > size) {
      _link = _link.substring(0, size/2 - 5) + '...' + _link.slice(-(size/2 + 5))
    }
    
    activity.process(`${termx.magenta.write(_link)}`)
    
    try {
      const response = await fetch(href)
      if (!response.ok) {
        bad_links[target].push([attr, href])
        Cursor.to(0, startLineForBadLinks + 2)
        process.stdout.write(`\r${termx.gray.write("Bad links found    :")} ${termx.yellowBright.write(getBadLinksCount())}`)
      } else {
        if (attr === "href") await run(href)
      }
    } catch (error) {
      bad_links[target].push([attr, href])
      Cursor.to(0, startLineForBadLinks + 2)
      process.stdout.write(`\r${termx.gray.write("Bad links found    :")} ${termx.yellowBright.write(getBadLinksCount())}`)
    }
  }
  
  return {total: total_links, bad: getBadLinksCount(), bad_links, pos: activity.position}
}