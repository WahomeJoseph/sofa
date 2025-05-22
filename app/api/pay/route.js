import axios from "axios"
import { NextResponse } from "next/server"


let token = ''
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
    return NextResponse.json(
      { message: 'Error generating token', error: error.message },
      { status: 500 }
    )
  }
}

// stkpush route
export async function POST(req, res) {
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
    return NextResponse.json(
      {
        message: 'STK push initiated successfully',
        response: response.data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error initiating STK push:', error.message);
    return NextResponse.json(
      { message: 'Error initiating STK push', error: error.message },
      { status: 500 }
    )
  }
}