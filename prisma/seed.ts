import { PrismaClient } from '@prisma/client'
import { News } from '../src/entity/news.model'
import { Role } from '../src/entity/role'
import { SiteUser } from '../src/entity/siteuser.model'
const prisma = new PrismaClient()


async function seedScript() {
  //genereer user seeds
  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: new SiteUser({
      name: "admin",
      role: Role.Admin,
      password: "admin"
    }),
  })

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: new SiteUser({
      name: "writer",
      role: Role.Staff,
      password: "writer"
    }),
  })

  const user3 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: new SiteUser({
      name: "user",
      role: Role.User,
      password: "user"
    }),
  })

  //genereer game seeds

  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create:
    {
      id: 1,
      name: "game 1",
      boxart: "boxart voor game 1"
    },
  })

  const game2 = await prisma.game.upsert({
    where: { id: 2 },
    update: {},
    create:
    {
      id: 2,
      name: "game 2",
      boxart: "boxart voor game 2"
    },
  })

  const game3 = await prisma.game.upsert({
    where: { id: 3 },
    update: {},
    create:
    {
      id: 3,
      name: "game 3",
      boxart: "boxart voor game 3"
    },
  })

  //genereer nieuws seeds
  const newsitem1 = await prisma.news.upsert({
    where: { id: 1 },
    update: {},
    create:
    {
      id: 1,
      content: "Nieuws over game 1",
      writerId: 1,
      gameId: 1
    },
  })

  const newsitem2 = await prisma.news.upsert({
    where: { id: 2 },
    update: {},
    create:
    {
      id: 2,
      content: "Nieuws over game 2",
      writerId: 2,
      gameId: 2
    },
  })

  const newsitem3 = await prisma.news.upsert({
    where: { id: 3 },
    update: {},
    create:
    {
      id: 3,
      content: "Nieuws over game 3",
      writerId: 3,
      gameId: 3
    },
  })
  //genereer review seeds
  const review1 = await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create:
    {
      id: 1,
      content: "Review van game 1",
      writerId: 1,
      gameId: 1
    },
  })

  const review2 = await prisma.review.upsert({
    where: { id: 2 },
    update: {},
    create:
    {
      id: 2,
      content: "Review van game 2",
      writerId: 2,
      gameId: 2
    },
  })

  const review3 = await prisma.review.upsert({
    where: { id: 3 },
    update: {},
    create:
    {
      id: 3,
      content: "Review van game 1",
      writerId: 3,
      gameId: 3
    },
  })
  console.log(game1, game2, game3);
}

seedScript()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

