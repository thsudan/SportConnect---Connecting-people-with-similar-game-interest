const User = require('../models/userModel');

exports.renderIndex = (req, res) => {
  res.render('index');
};

exports.renderSignup = (req, res) => {
  res.render('signup');
};

exports.signup = async (req, res) => {
  const { full_name, email, phone, username, password } = req.body;
  try {
    const newUser = new User({
      full_name,
      email,
      phone,
      username,
      password, // Storing password as plain text (for demonstration purposes)
    });
    await newUser.save();
    console.log('User added to database');
    res.redirect('/signup-success');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log('User authenticated successfully');
      req.session.user = user; // Save user info in the session
      res.redirect('/dashboard');
    } else {
      res.status(401).render('login', { error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.renderDashboard = (req, res) => {
  if (req.session && req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
};

exports.renderSignupSuccess = (req, res) => {
  res.render('signupSuccess');
};

exports.renderSportsList = (req, res) => {
  // You could potentially pass a list of sports from your database here
  const sports = ["Football", "Basketball", "Baseball"]; // Example static list
  res.render('sportsList', { sports });
};

