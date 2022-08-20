interface User {
  id: string | undefined,
  firstName: string,
  lastName: string,
  password: string,
  role: string,
  email: string,
  profileUrl: string
}

export = User;
