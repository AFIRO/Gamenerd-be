/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })


async function seedScript() {
  //genereer role seeds
  const role1 = await prisma.role.create({
    data: {
      name: "ADMIN"
    } });

    const role2 = await prisma.role.create({
      data: {
        name: "WRITER"
      } });

      
      const role3 = await prisma.role.create({
        data: {
          name: "USER"
        } });
    

  //genereer user seeds
  const user1 = await prisma.user.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "admin",
      roles: {
        connect: [{name: "ADMIN"}, {name: "WRITER" }]
      },
      password: "$argon2id$v=19$m=131072,t=6,p=1$ZOxs3obC98rJgX9FZmIzaQ$DrBRNH9W9m+cOMN8d5StrW8cwpEKoAc5n63Av/lGMIQ"
    },
  })

   const user2 = await prisma.user.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      name: "writer",
      roles: {
        connect: [{name: "WRITER"}]
      },
      password: "$argon2id$v=19$m=131072,t=6,p=1$UeXy7mMiDuUZnKsEWHmUkg$xp00Yq1QTCTLVlxrBmh/L6OscgPvy2byNfkvLfFxlQE"
    },
  })

  const user3 = await prisma.user.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3", 
      name: "user",
      roles: {
        connect: [{name: "USER" }]
      },
      password: "$argon2id$v=19$m=131072,t=6,p=1$Z/jRmTHnlK8VzUNPUNkbsw$nYIZz0DfXg1cS3SMB1S04fLSpNeDnOsCyo58+9Mu7rM"
    },
  })

  //genereer game seeds

  const game1 = await prisma.game.upsert({
    where: { id: "1" },
    update: {},
    create:
    {
      id: "1",
      name: "game 1",
      boxart: "boxart voor game 1"
    },
  })

  const game2 = await prisma.game.upsert({
    where: { id: "2" },
    update: {},
    create:
    {
      id: "2",
      name: "game 2",
      boxart: "boxart voor game 2"
    },
  })

  const game3 = await prisma.game.upsert({
    where: { id: "3" },
    update: {},
    create:
    {
      id: "3",
      name: "game 3",
      boxart: "boxart voor game 3"
    },
  })

  //genereer nieuws seeds
  const newsitem1 = await prisma.news.upsert({
    where: { id: "1" },
    update: {},
    create:
    {
      id: "1",
      content: "Nieuws over game 1",
      writerId: "1",
      gameId: "1"
    },
  })

  const newsitem2 = await prisma.news.upsert({
    where: { id: "2" },
    update: {},
    create:
    {
      id: "2",
      content: "Nieuws over game 2",
      writerId: "2",
      gameId: "2"
    },
  })

  const newsitem3 = await prisma.news.upsert({
    where: { id: "3" },
    update: {},
    create:
    {
      id: "3",
      content: "Nieuws over game 3",
      writerId: "3",
      gameId: "3"
    },
  })
  //genereer review seeds
  const review1 = await prisma.review.upsert({
    where: { id: "1" },
    update: {},
    create:
    {
      id: "1",
      score: 9,
      content: "Review van game 1",
      writerId: "1",
      gameId: "1"
    },
  })

  const review2 = await prisma.review.upsert({
    where: { id: "2" },
    update: {},
    create:
    {
      id: "2",
      score: 7,
      content: "Review van game 2",
      writerId: "2",
      gameId: "2"
    },
  })

  const review3 = await prisma.review.upsert({
    where: { id: "3" },
    update: {},
    create:
    {
      id: "3",
      score: 6,
      content: "Review van game 3",
      writerId: "3",
      gameId: "3"
    },
  })
}

seedScript()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

