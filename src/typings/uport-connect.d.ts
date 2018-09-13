declare module 'uport-connect' {
  export const Connect: any
}

declare module 'web3' {
  const web3: any
  export default web3
}

declare module 'uport' {
  const Credentials: any
  const SimpleSigner: any
  const JWT: any
  export {
    Credentials,
    SimpleSigner,
    JWT,
  }
}

declare module 'did-jwt' {
  const SimpleSigner: any
  const createJWT: any
  export {
    createJWT,
    SimpleSigner,
  }
}

declare module 'mnid' {
  const isMNID: any
  const decode: any
  export {
    isMNID,
    decode,
  }
}
