const app = require("./app");
const db = require("./models");

const PORT = 3001;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log(" Database synced.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing DB: ", err);
  });
