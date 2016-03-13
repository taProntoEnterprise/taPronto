var mongoose = require('mongoose'),
    User = require('./models/user');

var connStr = 'mongodb://localhost:27017/taPronto';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
//var testUser = new User({
   //username: 'jmar777',
    //password: 'Password123'
//});

// save user to database
//testUser.save(function(err) {
   //if (err) throw err;
//});

// fetch user and test password verification
User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;

    console.log(user);

    // test a matching password
    user.verifyPass('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
    });

    // test a failing password
    user.verifyPass('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
});