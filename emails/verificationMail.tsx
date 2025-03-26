import * as React from 'react';
import { Html, Button , Head, Font, Preview, Section, Heading, Row, Text } from "@react-email/components";
interface VerificationMailProps {
  username: string;
  otp: string;
}


export default function  VerificationMail({username,otp}:VerificationMailProps) {
  return (
<Html lang="en" dir="ltr">
  <Head>
    <title>Verification Code</title>
    <Font 
    fontFamily="Roboto"
    fallbackFontFamily= 'Verdana'
    webFont={{
      url:'https//fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
      format:'woff2',
    }}
    fontWeight={400}
    fontStyle='normal'
    />
  </Head>
  <Preview>
    Here&apos;s your verification code :{otp} </Preview>
    <Section>
      <Row>
      <Heading>Hi {username},</Heading>
      </Row>
      <Row>
        <Text>Thank you for registering , please use the following verification code </Text>
      </Row>
      <Row>
        <Text>{otp}</Text>
      </Row>
    </Section>
  </Html>
  );
}
