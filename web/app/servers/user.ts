import { v4 as uuidv4 } from 'uuid';
import { sql } from "@vercel/postgres";

export const checkAndSaveUser = async (name:string, email:string, image:string) => {
  const results = await sql`select * from user_info where email=${email}`;
  const users = results.rows;
  if (users.length <= 0) {
    const result = {
      user_id: '',
      name: '',
      email: '',
      image: '',
    }
    // 新增
    try {
      const strUUID = uuidv4();
      await sql`insert into user_info(user_id,name,email,image) values(${strUUID},${strUUID},${email},${image}) RETURNING *`;
      result.user_id = strUUID;
      result.name = name;
      result.email = email;
      result.image = image;
      return result;
    } catch (e) {
      console.log(e)
      return result;
    }
  } else {
    // 更新
    const user = users[0];
    await sql`update user_info set name=${name},image=${image},updated_at=now() where id=${user.id}`;
    return user;
  }
}

export const getUserById = async (user_id) => {
  const results = await sql`select * from user_info where user_id=${user_id}`;
  const users = results.rows;
  if (users.length > 0) {
    const user = users[0];
    return {
      user_id: user_id,
      name: user.name,
      email: user.email,
      image: user.image,
      status: 1
    }
  }
  return {
    user_id: user_id,
    name: '',
    email: '',
    image: '',
    status: 0
  }
}

export const getUserByEmail = async (email) => {

  const results = await sql`select * from user_info where email=${email}`;
  const users = results.rows;
  if (users.length > 0) {
    const user = users[0];
    return {
      user_id: user.user_id,
      name: user.name,
      email: email,
      image: user.image,
      status: 1
    }
  }
  return {
    user_id: '',
    name: '',
    email: email,
    image: '',
    status: 0
  }
}
