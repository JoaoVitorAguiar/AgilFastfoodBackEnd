// insertAdminUser.ts
import { PrismaClient } from "@prisma/client";

export async function insertAdminUser(prisma: PrismaClient) {
  const adminEmail = 'admin@admin.com';
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!existingAdmin) {
    const newUser = await prisma.user.create({
      data: {
        id: 'f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f2',
        cpf: null,
        fullName: 'admin',
        email: adminEmail,
        phone: null,
        zipCode: null,
        state: null,
        city: null,
        neighborhood: null,
        address: null,
        number: null,
        complement: null,
        isAdmin: true,
        password_hash: '$2b$06$7yjrQmDCoWqdolyHvRvqKex18L.m6YZXdK8iCqZ5jiyZZ5yMIZ65a',
        created_at: new Date('2023-12-12T23:14:36.855Z'),
        updated_at: new Date('2023-12-12T23:16:27.903Z')
      }
    });
    console.log('Admin user created:');
  } else {
    console.log('Admin user already exists:', existingAdmin);
  }
}
