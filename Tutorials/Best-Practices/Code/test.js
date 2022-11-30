const test = async () => {
  const salt = await require("bcrypt").genSalt(10)
  const hashedPassword = await require("bcrypt").hash("admin", salt)
  console.log(hashedPassword);
}
test()

