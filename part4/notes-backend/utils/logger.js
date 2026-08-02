export function infoLog(...params) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

export function errorLog(...params) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}
