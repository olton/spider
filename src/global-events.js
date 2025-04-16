import { termx } from '@olton/terminal'
import {FAIL} from './constants.js'

const registerGlobalEvents = () => {
  // Глобальная обработка ошибок
  process.on('uncaughtException', (error) => {
    console.log(`\n\n\n\n`)
    console.log(termx.error(`${FAIL} Unprocessed exception: ${error.message}`))
    if (config.verbose) {
      console.log(termx.gray.write(error.stack))
    }
    console.log(`\n\n`)
    process.exit(1)
  })

  process.on('unhandledRejection', (error) => {
    console.log(`\n\n\n\n`)
    console.log(termx.error(`${FAIL} Unprocessed promise reject: ${error.message}`))
    if (config.verbose) {
      console.log(termx.gray.write(error.stack))
    }
    console.log(`\n\n`)
    process.exit(1)
  })

  // Обработка сигналов завершения
  process.on('SIGINT', () => {
    console.log(`\n\n\n\n`)
    console.log(termx.error(`${FAIL} The testing process was interrupted by the user!`))
    console.log(`\n\n`)
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    console.log(`\n\n\n\n`)
    console.log(termx.error(`${FAIL} The testing process was interrupted by the system!`))
    console.log(`\n\n`)
    process.exit(0)
  })
}

export default registerGlobalEvents