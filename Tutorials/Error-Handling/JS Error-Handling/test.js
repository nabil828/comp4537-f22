try {
  let x = true
  if (x)
    throw new Error('test')
}
catch (err) {
  // Error
  console.log(err.name);
  console.log(err.message);
}