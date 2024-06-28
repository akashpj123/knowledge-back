import { Profile } from '../model/profile.js';

// Create a new profile
export const createProfile = async (req, res) => {
  const { firstName, dateOfBirth, mobileNumber, address1 } = req.body;
  try {
    // Ensure that the authenticated user's ID is available in req.userId
    const userId = req.userId;
    if (!userId) {
      // If user ID is not available, return an error response
      return res.status(401).json({ message: 'User ID is missing or invalid.' });
    }

    // Create a new profile instance
    const profile = new Profile({
      user: userId, // Assuming the user ID is available in req.userId after token verification
      firstName,
      dateOfBirth,
      mobileNumber,
      address1
    });

    // Save the profile to the database
    await profile.save();

    // Return a success response with the created profile
    res.status(200).json(profile);
  } catch (error) {
    // Handle errors if any occur during profile creation
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile', error: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if userId is valid (not null and a valid ObjectId)
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    // Assuming Post is your Mongoose model for posts
    const posts = await Profile.find({ user: userId });

    res.status(200).json(posts); // Sending the post details as a JSON response
} catch (error) {
    console.error('Error finding post:', error);
    res.status(500).json({ message: 'Error finding post', error: error.message });
}
};



// Update a profile by ID
export const updateProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!profile) {
      // Handle case where profile is not found
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
    return profile;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw new Error('Error updating profile: ' + error.message);
  }
};

// Delete a profile by ID
export const deleteProfileById = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    throw new Error('Error deleting profile: ' + error.message);
  }
};