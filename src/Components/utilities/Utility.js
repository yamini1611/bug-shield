
export const decryptPassword = (encryptedPassword) => {
    return encryptedPassword.split('').reverse().join('');
  };
  
  export const baseUrl = process.env.REACT_APP_BASE_URL;
