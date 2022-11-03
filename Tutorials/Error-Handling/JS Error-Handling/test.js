try {
  throw new Error('Error thrown');
} catch (err) {
  console.log(err.name);
  console.log(err.message);
}