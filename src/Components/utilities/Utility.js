export  const encryptPassword = (password) => {
  return password.split('').reverse().join('');
};

export const decryptPassword = (encryptedPassword) => {
  if (encryptedPassword === null) {
    return '';
  }
  return encryptedPassword.split('').reverse().join('');
}



  

