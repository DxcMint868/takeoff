import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { NOTION_INTERESTED_SERVICE_NAMES } from '../../lib/contact-interested-services';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

interface FormData {
  fullName: string;
  email: string;
  telegram: string;
  companyName: string;
  interestedServices?: string[];
  projectDetails: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, telegram, companyName, interestedServices, projectDetails }: FormData = req.body;
    const servicesRaw = Array.isArray(interestedServices) ? interestedServices : [];
    const services = servicesRaw.filter((name) => NOTION_INTERESTED_SERVICE_NAMES.has(name));
    console.log(fullName, email, telegram, companyName, services, projectDetails);
    try {
      console.log(databaseId);
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Company': {
            rich_text: [
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
            title: [
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
          },
          'Source': {
            select: {
              name: 'Website'
            }
          },
          ...(services.length > 0 ? {
            'Interested Services': {
              multi_select: services.map((name) => ({ name }))
            }
          } : {}),
          'Date': {
            date: {
              start: new Date().toISOString()
            }
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
