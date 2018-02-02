import { Decimal } from 'decimal.js'

export const numberToString = (amount: string, decimals: number): string => {
  const bigAmount = new Decimal(amount)
  const bigMultiplier = new Decimal(10).pow(decimals)
  return  bigAmount.div(bigMultiplier).toFixed(decimals)
}

export const powToString = (val1: number, val2: number): string => {
  const big1 = new Decimal(val1)
  const bigMultiplier = new Decimal(10).pow(val2)
  return  big1.mul(bigMultiplier).toString()
}
