export const getRandomID = () => Math.random().toString(36).substring(2, 10);

export const assignID = (obj) => ({ ...obj, id: getRandomID() });
