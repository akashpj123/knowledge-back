import { Post, Comment } from '../model/create.js';
import { User } from '../model/user.js';
export const createPost = async (req, res) => {
  const { Title, description, references, categories, posterUrl } = req.body;
  try {
    // Ensure that the authenticated user's ID is available in req.userId
    const userId = req.userId;
    if (!userId) {
      // If user ID is not available, return an error response
      return res.status(401).json({ message: 'User ID is missing or invalid.' });
    }
    // Create a new post with the user's ID automatically populated
    const newPost = new Post({
      user: userId,
      Title,
      description,
      references,
      categories,
      posterUrl,
    });
    // Save the new post to the database
    await newPost.save();
    console.log('Post created successfully.');
    // Send a response indicating success
    res.status(201).json({ message: 'Post created successfully.' });
  } catch (err) {
    console.error('Error creating post:', err);
    // Send an error response
    res.status(500).json({ message: 'Failed to create post.', error: err.message });
  }
};

export const viewPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
    return post;
  } catch (error) {
    throw new Error('Error finding post: ' + error.message);
  }
};

export const userviewPost = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if userId is valid (not null and a valid ObjectId)
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Assuming Post is your Mongoose model for posts
        const posts = await Post.find({ user: userId });

        res.status(200).json(posts); // Sending the post details as a JSON response
    } catch (error) {
        console.error('Error finding post:', error);
        res.status(500).json({ message: 'Error finding post', error: error.message });
    }
};
export const getPostById=async(req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    return post;
  }catch(error){
    throw new Error('Error finding post: ' + error.message);
  }
}
export const searchPost = async (req, res) => {
  try {
    const { Title } = req.body;
    const posts = await Post.find({ Title: { $regex: Title, $options: 'i' } });
    res.status(200).json(posts);
    return posts;
  } catch (error) {
    throw new Error('Error finding post: ' + error.message);
  }
}
// Update a post by ID
export const updatePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(post);
    return post;
  } catch (error) {
    throw new Error('Error updating post: ' + error.message);
  }
};

// Delete a post by ID
export const deletePostById = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    throw new Error('Error deleting post: ' + error.message);
  }
};

export const createComment = async (req, res) => {
  try {

    const { comment } = req.body;
    // Create and save the new comment
    const newComment = new Comment({
      postId: req.params.id,
      comment
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.find();
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error finding comment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};