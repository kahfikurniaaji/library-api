import Book from "../model/book.js";
import Borrowing from "../model/borrowing.js";
import Member from "../model/member.js";

const generateTable = async () => {
  await Book.sync({ force: false, alter: true });
  await Member.sync({ force: false, alter: true });
  await Borrowing.sync({ force: false, alter: true });
};

const createRelations = async () => {
  Book.hasMany(Borrowing, { foreignKey: "book_code" });
  Borrowing.belongsTo(Book, { foreignKey: "book_code" });

  Member.hasMany(Borrowing, { foreignKey: "member_code" });
  Borrowing.belongsTo(Member, { foreignKey: "member_code" });
};

const migration = async () => {
  await createRelations();
  await generateTable();
};

export default migration;
