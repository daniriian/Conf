  export const login = async (user, csrf) => {
    // event.preventDefault();
    // console.log('running login async function');
    await fetch('/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        instanta: user.instanta,
      }),
    })
     
  };