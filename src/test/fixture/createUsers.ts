import mongoose from '../../libs/mongoose';

function open() {
  return new Promise((res, rej) => {
    mongoose.connection.on('open', () => {
      console.log('open');
      res();
    });
  });
}

function dropDatabase() {
  return mongoose.connection.db.dropDatabase();
}

function createUsers(count: number = 5) {
  return new Promise(async (res: any, rej) => {
    await import('../../models/user');

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

async function close() {
  await mongoose.disconnect();
}

export async function createDbUsers() {
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
