export const getLocationData = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
    return response;
  };