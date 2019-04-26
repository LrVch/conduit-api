import mongoose from '../../libs/mongoose';

export function open() {
  return new Promise((res, rej) => {
    mongoose.connection.on('open', () => {
      // console.log('open');
      res();
    });
  });
}

export function dropDatabase() {
  return mongoose.connection.db.dropDatabase();
}

export function createUsers(count: number = 5) {
  return new Promise(async (res: any, rej) => {
    await import('../../models/app/User');

    const users = Array.from({ length: count }).map((elem, i) =>
      new mongoose.models.UserModel({ username: `${i}-user` }).save()
    );

    Promise.all(users)
      .then((results: Document[]) => {
        res(results);
      })
      .catch(err => {
        rej(err);
      });
  });
}

export async function close() {
  await mongoose.disconnect();
}

export async function populateDbUsers() {
  try {
    await open();
    await dropDatabase();

    const users: any = await createUsers();

    console.log(`${users.length} test users were added`);

    return users;

    // await close();
  } catch (e) {
    await close();
    console.error(e.message);
    process.exit(1);
  }
}
