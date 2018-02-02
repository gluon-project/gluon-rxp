import { Decimal } from 'decimal.js'

export const numberToString = (val1: string, val2: number): string => {
  const amount = val1 ? val1 : '0'
  const decimals = val2 ? val1 : '0'
  const bigAmount = new Decimal(amount)
  const bigMultiplier = new Decimal(10).pow(decimals)
  return  bigAmount.div(bigMultiplier).toFixed(val2 ? val2 : 0)
}

export const powToString = (val1: number, val2: number): string => {
  const value1 = val1 ? val1 : '0'
  const value2 = val2 ? val1 : '0'
  const big1 = new Decimal(value1)
  const bigMultiplier = new Decimal(10).pow(value2)
  return  big1.mul(bigMultiplier).toString()
}
