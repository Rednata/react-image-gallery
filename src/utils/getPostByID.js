export const getPostByID = (posts, id) => {
  const ind = posts.findIndex(post => post.id === id);
  return posts[ind];
};
