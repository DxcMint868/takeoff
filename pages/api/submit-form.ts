import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

interface FormData {
  fullName: string;
  email: string;
  telegram: string;
  companyName: string;
  projectDetails: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, telegram, companyName, projectDetails }: FormData = req.body;
    console.log(fullName, email, telegram, companyName, projectDetails);
    try {
      console.log(databaseId);
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Company Name': {
            title: [
              {
                text: {
                  content: companyName
                }
              }
            ]
          },
          'Email': {
            email: email
          },
          'Telegram': {
            rich_text: [
              {
                text: {
                  content: telegram
                }
              }
            ]
          },
          'Full Name': {
            rich_text: [
              {
                text: {
                  content: fullName
                }
              }
            ]
          },
          'Project Details': {
            rich_text: [
              {
                text: {
                  content: projectDetails
                }
              }
            ]
          }
        }
      });
      console.log(response);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to submit form' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
