const index = (req, res) => {
    // Check if user is logged in by checking for the presence of a cookie
    const loggedIn = req.cookies['loggedIn'];
    
    if (loggedIn) {
      // User is logged in, render the home page
      res.render('home', { loggedIn });
    } else {
      // User is not logged in, render the login page
      res.render('login');
    }
  }
  
  const homeController = {
    index,
  };
  
  module.exports = homeController;
  