import { Decimal } from 'decimal.js'

export const numberToString = (amount: number, decimals: number): string => {
  const bigAmount = new Decimal(amount)
  const bigMultiplier = new Decimal(10).pow(decimals)
  return  bigAmount.div(bigMultiplier).toFixed(decimals)
}
