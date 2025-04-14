import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const defaultConfig = {
  attr: ["href", "src", "srcset", "action"],
}

export const updateConfig = (args) => {
  global.config = {...defaultConfig}
  
  // Add your update configuration here
  if (args.attr && args.attr.length > 0) { config.attr = args.attr.split(',').map(attr => attr.trim()).filter(attr => attr.length > 0) }
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
    .parse()
}