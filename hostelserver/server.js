const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/nightout', async (req, res) =>
     {
  const { prn, name, course, batch, date, timeOut, timeIn, facultyEmail, parentEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ' ',       // Replace with your email
      pass: '   '           // Use App Password if using Gmail
    }
  });
    const message = `
    Hostel Night-Out Request:
    Name: ${name}
    PRN: ${prn}
    Course: ${course}
    Batch: ${batch}
    Date: ${date}
    TimeOut: ${timeOut}
    TimeIn: ${timeIn}
  `;

  try {
    await transporter.sendMail({
      from: ' ',
      to: [facultyEmail, parentEmail],
      subject: 'Night-Out Request Submitted',
      text: message
    });
    res.status(200).send('Emails sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
