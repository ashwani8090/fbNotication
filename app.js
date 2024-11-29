// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { sendNotificationToDevice } = require(".");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route to send a notification
app.post("/send-notification", async (req, res) => {
  const { recipientToken, message, title } = req.body;
  console.log('message: ', message);

  if (!recipientToken || !message) {
    return res
      .status(400)
      .json({ error: "Recipient token and message are required" });
  }

  try {
    sendNotificationToDevice(recipientToken, title ?? 'Message' ,message);
    return res
      .status(200)
      .json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
