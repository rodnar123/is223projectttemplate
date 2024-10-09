// pages/api/teachers/index.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all person
      const persons = await prisma.person.findMany();
      res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch person' });
    }
  } else if (req.method === 'POST') {
    const { firstName, lastName, email, phone, dateOfBirth, gender,occupation } = req.body;

    try {
      // Check if the email is already used
      const existingPerson = await prisma.person.findUnique({
        where: { email },
      });

      if (existingPerson) {
        return res.status(400).json({ error: 'Email is already in use.' });
      }

      // Create a new person
      const newPerson = await prisma.person.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          gender,
          occupation,
          
        },
      });
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create person' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
