import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

let token = ''

// middleware to generate tokens
export const createToken = async (req, res, next) => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_SECRET_KEY

  const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
  try {
    const response = await axios
      .get(' https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            authorization: `Basic ${auth}`,
          },
        }
      )
    token = response.data.access_token
    console.log(response.data)
    next()
    // if (!phone || !amount) {
    //   res.status(201).json({message: 'All inputs are required!'})
    // }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error paying', error: error.message })
  }
}

// stkpush route
app.post('/token', createToken, async (req, res) => {
  const { phone, amount } = req.body
  const shortcode = process.env.MPESA_SHORTCODE
  const passKey = process.env.MPESA_PASSKEY

  const date = new Date()
  const timeStamp =
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2)

  const password = new Buffer.from(shortcode + passKey + timeStamp).toString('base64')
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

  const data = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: 'Sofa Lux Merch',
    TransactionDesc: 'Sofa Lux Merch',
  }
  console.log('STK Push Request Data:', data)

  try {
    const response = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    console.log('STK Push Response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error initiating STK push:', error.message);
    res.status(400).json({ error: error.message });
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to Sofa Lux!');
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) 