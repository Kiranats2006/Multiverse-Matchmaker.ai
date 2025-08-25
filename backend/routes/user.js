const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const User=require('../models/user')
const jwt=require('jsonwebtoken');
const { use } = require('react');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', async(req,res)=>{
    try{
        const {username, email, password}=req.body;
        const hashedPass=await bcrypt.hash(password, 10);
        const newuser=new User({username, email, password: hashedPass});
        await newuser.save();
        res.status(201).json({message: 'User registered'});
    }
    catch(err){
        res.status(400).json({error:'User already exists', err})
    }
})
router.post('/login', async (req,res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // fetch fresh user after potential onboarding update
    user = await User.findById(user._id);

    res.json({
      token,
      username: user.username,
      userId: user._id,
      firstLogin: user.firstLogin
    });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).select('-password');
        if(!user) return res.json({message:'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' }, error);
    }
})

router.put('/:id', authMiddleware ,async(req,res)=>{
    try {
        const userId=req.params.id;
        const updates=req.body;
        if(req.user.userId!=userId){
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const updateUser=await User.findByIdAndUpdate(
            userId,
            {$set: updates},
            {new: true}
        );
        res.json(updateUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error',}, error);
    }
})

router.delete('/:id', authMiddleware, async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})


router.put("/:id/finish-onboarding", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstLogin: false },
      { new: true }
    );
    res.json({ message: "Onboarding completed", firstLogin: user.firstLogin });
  } catch (err) {
    res.status(500).json({ error: "Failed to update onboarding status" });
  }
});


module.exports=router;