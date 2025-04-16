import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const defaultConfig = {
  attr: ["href", "src", "srcset", "action"],
  dir: "",
  name: `bad-links.txt`,
  agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
}

export const updateConfig = (args) => {
  global.config = {...defaultConfig}
  
  // Add your update configuration here
  if (args.attr) { config.attr = args.attr.split(',').map(attr => attr.trim()).filter(attr => attr.length > 0) }
  if (args.dir) { config.dir = args.dir }
  if (args.name) { config.name = args.name }
  if (args.agent) { config.agent = args.agent }
}

export const processArgv = () => {
  return yargs(hideBin(process.argv))
    .usage('Usage: $0 [options] <target>')
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run in verbose mode'
    })
    .option('attr', {
      type: 'string',
      description: 'Attributes to include to checking',
    })
    .option('dir', {
      type: 'string',
      description: 'Output directory for the report',
    })
    .option('name', {
      type: 'string',
      description: 'The report name',
    })
    .option('agent', {
      type: 'string',
      description: 'User agent to use for the requests. Default "Chrome 58 UA"',
    })
    .parse()
}