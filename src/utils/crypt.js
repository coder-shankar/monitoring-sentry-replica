import bcrypt from "bcrypt-nodejs";

// const SALT_WORK_FACTOR = 10;

export function encrypt(data) {
  //   const salt = bcrypt.genSalt(SALT_WORK_FACTOR);

  return bcrypt.hashSync(data);
}

export function compare(data, source) {
  return bcrypt.compareSync(data, source);
}
