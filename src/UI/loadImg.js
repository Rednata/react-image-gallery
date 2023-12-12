export const loadImg = (img) => {
  console.log();
  return new Promise(resolve => {
    const image = document.createElement('img');
    image.src = img;
    // console.log(image);
    image.onload = () => {
      // console.log('2');
      resolve(img);
    };
  });
};

