// generate a fake, yet realistic ip address that allows you to choose the first octet
export const generateIpAddress = (firstOctet) => {
  return `${firstOctet}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}