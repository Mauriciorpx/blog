const postControllers = require("./posts.controllers");
const jwt = require("jsonwebtoken");

const getAllP = (req, res) => {
  const data = postControllers.getAllPosts();
  res.status(200).json({ items: data.length, users: data });
};

const getPByID = (req, res) => {
  const id = req.params.id;
  const data = postControllers.getPostByID(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res
      .status(404)
      .json({ message: `The post with the id ${id} does not exist` });
  }
};

const publish = (req, res) => {
  const userID = req.user.id;
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (!data.title || !data.content || !data.header_image) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "www.imgUrl.com/imgTest",
      },
    });
  } else {
    const response = postControllers.createPost(userID, data);
    return res.status(201).json({
      message: `Post created succesfully with id: ${response.id}`,
      user: response,
    });
  }
};

const getMyPublications = (req, res) => {
  const user_id = req.user.id;
  const data = postControllers.getallMyPosts(user_id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `The user does not have posts` });
  }
};

const getMyPublishByID = (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const data = postControllers.getMyPostByID(user_id, id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: `The post with the id ${id} does not exist on the publications of user with id ${user_id}`,
    });
  }
};

const removeMyPublish = (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const data = postControllers.deleteMyPost(user_id, id);
  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "You cant delete this post" });
  }
};

const editMyPost = (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (!data.title || !data.content || !data.header_image) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "String",
        content: "String",
        header_image: "www.urlIMG/IMG-Example",
      },
    });
  } else {
    const response = postControllers.editMyPost(user_id, id, data);
    return res.status(200).json({
      message: "Post edited successfully",
      user: response,
    });
  }
};

module.exports = {
  publish,
  getAllP,
  getPByID,
  getMyPublications,
  getMyPublishByID,
  removeMyPublish,
  editMyPost,
};
