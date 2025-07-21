import User from "../models/User.js";
import ClaimHistory from "../models/ClaimHistory.js";
import bcrypt from "bcryptjs";


export const getUsers = async (req, res) => {
  console.log(req);
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
  };

// Add a new user
export const addUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });
      
      const passwordHashed = await bcrypt.hash(password , 10);
      console.log(passwordHashed);

      const newUser = new User({ username, email, password:passwordHashed });
      await newUser.save();
  
      res.status(201).json({ message: "User created", user: newUser });
    } catch (err) {
      res.status(500).json({ message: "Failed to add user", error: err.message });
    }
  };

// ClaimHistory Points (add to claimedBy from awardedBy)
export const claimPoints = async (req, res) => {
    try {
      const { claimedBy, awardedBy, claimedPoints:points } = req.body;
  
      if (!claimedBy || !awardedBy || !points) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const getUser = await User.findById(claimedBy);
      const givenUser = await User.findById(awardedBy);
  
      if (!getUser || !givenUser) {
        return res.status(404).json({ message: "User(s) not found" });
      }
  
      getUser.totalPoints += points;
      await getUser.save();
  
      const history = new ClaimHistory({
        claimedBy,
        awardedBy,
        claimedPoints: points,
      });

      await history.save();
  
      res.status(200).json({
        message: "Points claimed successfully",
        claimedBy: { username: getUser.username, totalPoints: getUser.totalPoints },
        awardedBy: { username: givenUser.username },
        claimedPoints: points,
      });
    } catch (err) {
      res.status(500).json({ message: "Error claiming points", error: err.message });
    }
  };


// Get Leaderboard

export const getLeaderboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .sort({ totalPoints: -1 }) // Sort by highest points first
      .skip(skip)
      .limit(limit);

    const leaderboard = users.map((user, index) => ({
      rank: skip + index + 1, // Global rank, not just 1-10
      username: user.username,
      totalPoints: user.totalPoints,
    }));

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users: leaderboard,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: err.message });
  }
};

export const getClaimHistoryByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const claims = await ClaimHistory.find({ claimedBy: userId })
      .populate("awardedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claim history:", error.message);
    res.status(500).json({ error: "Failed to fetch claim history" });
  }
};