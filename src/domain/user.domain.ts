export default interface User {
  _id: string | undefined,
  firstName: string,
  lastName: string,
  password: string,
  role: string,
  email: string,
  profileUrl: string
}
