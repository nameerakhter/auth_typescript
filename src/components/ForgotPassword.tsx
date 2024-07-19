import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';


interface ForgotPasswordEmailProps {
  username: string,
  otp: string
}

import React from 'react'

export default function ForgotPasswordEmail ({username, otp}:ForgotPasswordEmailProps) {
  return (
    <Html>
    <Head>
      {/* Add any custom fonts or styles here */}
    </Head>
    <Preview>Your OTP is:</Preview>
    <Section style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Heading style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Forgot Password
      </Heading>
      <Text style={{ fontSize: '16px' }}>
        Hello {username},
      </Text>
      <Text style={{ fontSize: '16px' }}>
       Please use the following OTP to login and reset your password:
      </Text>
      <Row>
        <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF0000' }}>
          {otp}
        </Text>
      </Row>
      <Button
        href="https://yourapp.com/forgotpassword"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFFFFF',
          borderRadius: '5px',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        Forgot Password Email
      </Button>
      <Text style={{ fontSize: '14px', marginTop: '20px' }}>
        If this is not you, We recommend you change your password immediately.
      </Text>
    </Section>
  </Html>
  )
}


