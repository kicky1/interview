import { LoginInput } from "../types/login.type";

export const loginUser = async ({ username, password }: LoginInput) => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
          }),
        }).then((response: any) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(
              new Error('User with this username and password does not exist.'),
            );
          }
        });
      }, 2000);
    });
  };