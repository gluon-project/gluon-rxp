export const short = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-6)}`
}
