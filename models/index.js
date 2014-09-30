// =====Twitter.JS with MySQL=============
var Sequelize = require('sequelize'),
    sequelize = new Sequelize('mysql://root@localhost:3306/twitterjs', {
      dialect: "mysql" // have to do npm install mysql --save
    })

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

var Tweet = require('./tweet.js')(sequelize);
var User = require('./user.js')(sequelize);

// this will give user.getTweet() method
// http://sequelizejs.com/docs/latest/associations#one-to-many
User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
  User: User,
  Tweet: Tweet
};