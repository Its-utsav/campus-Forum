import bcrypt from "bcrypt";

const hashed = await bcrypt.hash("utsav", 10);

// const old = "$2b$10$KXDuhC10HVFlJVXTMlrlIOnk29Guc9HHZXZrnJmh5UpryWHq1oI8O";

console.log(hashed);
const answer = await bcrypt.compare("utsav", hashed);

console.log(answer);
