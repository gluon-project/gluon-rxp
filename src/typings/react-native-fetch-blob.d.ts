declare module 'react-native-fetch-blob' {
  const fs: any
  const pathForAppGroup: any
  const fetch: any
  export default {
    fetch,
    fs: {
      pathForAppGroup,
    },
  }
}
