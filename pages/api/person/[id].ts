// pages/api/teachers/[id].ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch the person by ID
      const person = await prisma.person.findUnique({
        where: { id: Number(id) },
      });

      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }

      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch person' });
    }
  } else if (req.method === 'PUT') {
    const { firstName, lastName, email, phone, dateOfBirth, gender, occupation } = req.body;

    try {
      // Fetch the teacher
      const person = await prisma.person.findUnique({
        where: { id: Number(id) },
      });

      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }

      // Update the teacher's details
      const updatedPerson = await prisma.person.update({
        where: { id: Number(id) },
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

      res.status(200).json(updatedPerson);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update person' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete the person
      await prisma.person.delete({
        where: { id: Number(id) },
      });

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete person' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
