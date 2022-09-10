const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const postDB = [
  {
    id: "uuid",
    title: "string",
    content: "string",
    header_image: "url_to_img",
    user_id: "uuid", //Aqui hara referencia al usuario de tu userDB
    published: true,
  },
  {
    id: "5dd4417b-9927-407c-a675-68af84de089d",
    title: "My First test",
    content: "This is my first post test",
    header_image: "www.imgTest.com/loremImg",
    user_id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    published: true,
  },
];

/* Create a post */

const createPost = (userId, data) => {
  const newPost = {
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    header_image: data.header_image,
    user_id: userId,
    published: true,
  };
  postDB.push(newPost);
  return newPost;
};

/* Get all posts => for an admin role */

const getAllPosts = () => {
  return postDB;
};

/* Get all post of an user */

const getallMyPosts = (user_id) => {
  const data = postDB.filter((item) => item.user_id === user_id);
  return data.length ? data : false;
};

/* Get an specific post */

const getPostByID = (id) => {
  /* Data is an array */
  const data = postDB.filter((item) => item.id === id);
  return data.length ? data[0] : false;
};

/* Get one of my posts */

const getMyPostByID = (user_id, id) => {
  const post = getallMyPosts(user_id);
  const data = post ? post.filter((post) => post.id === id) : false;
  return data ? data[0] : false;
};

const editPost = (id, data) => {
  const index = postDB.findIndex((user) => user.id === id);
  if (index !== 1) {
    postDB[index] = {
      id: id,
      title: data.title,
      content: data.content,
      header_image: data.header_image,
      user_id: user_id,
      published: true,
    };
    return postDB[index];
  } else {
    createPost(data);
  }
};

const deletePost = (user_id, id) => {
  const index = postDB.findIndex((item) => item.id === id);
  if (index !== 1) {
    postDB.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

const editMyPost = (user_id, id, data) => {
  const index = postDB.findIndex((user) => user.id === id);
  if (user_id != postDB[index].user_id) {
    return false;
  } else if (index !== 1) {
    postDB[index] = {
      id: postDB[index].id,
      title: data.title,
      content: data.content,
      header_image: data.header_image,
      user_id: postDB[index].user_id,
      published: postDB[index].published,
    };
    return postDB[index];
  } else {
    createPost(data);
  }
};

const deleteMyPost = (user_id, id) => {
  const index = postDB.findIndex((item) => item.id === id);
  if (index !== 1) {
    if (user_id === postDB[index].user_id) {
      postDB.splice(index, 1);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getMyPostByID,
  getPostByID,
  getallMyPosts,
  deleteMyPost,
  editMyPost,
};
