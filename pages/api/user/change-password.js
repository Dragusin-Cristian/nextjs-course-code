import { getSession } from "next-auth/client";
import { connectToDb } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {

  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  // Protects the API route from unauthenticated users:
  // GREAT FOR CHECKING RIGHTS
  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
console.log(session);
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDb();
  const db = client.db();

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res.status(403).json({ message: "Invalid password" }); // 403: you are authenticated but not authorized
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

  // more error handling ...

  client.close();
  res.status(200).json({ message: "Password updated" });

}

export default handler;