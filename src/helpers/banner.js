import {termx} from "@olton/terminal";
import pkg from "../../package.json" with { type: "json" };
import { LOGO, STAR, WEB } from '../constants.js'

export const banner = () => {
    console.log(   termx.gray.write(`┌---------------------------------------------------------------┐`))
    console.log(`${termx.bold.write(`┊ ${LOGO} Spider`)} ${termx.bold.cyanBright.write(`v${pkg.version}`)}. ${termx.gray.write("Copyright (c) 2025 by")} ${termx.whiteBright.bold.write("Serhii Pimenov")}.💙💛  ┊`)
    console.log(   termx.gray.write(`├---------------------------------------------------------------┤`))
    console.log(`${termx.gray.write(`┊ ${WEB} Spider - is a simple links checker for web sites ${WEB} `)}     ┊`)
    console.log(`${termx.gray.write(`┊ ${STAR}   Support Spider by PayPal to`)} ${termx.cyan.bold.write("serhii@pimenov.com.ua")}. ${STAR}.     ┊`)
    console.log(   termx.gray.write(`└---------------------------------------------------------------┘`))
};