import sequelize from "../config/database.js";
import ConflictError from "../exception/conflict-error.js";
import NotFoundError from "../exception/not-found-error.js";
import Member from "../model/member.js";
import timeToLocaleTime from "../util/date-util.js";

// Service for adding member
const addMember = async ({ code, name }) => {
  if (await memberIsExist(code)) {
    throw new ConflictError("Code already exist");
  }

  const member = {
    code: code.trim(),
    name: name.trim(),
  };

  const result = await sequelize.transaction(async (t) => {
    const memberResult = await Member.create(member, { transaction: t });

    return memberResult.dataValues;
  });

  convertTimeMember(result);

  return result;
};

// Service for get members
const getMembers = async () => {
  const result = await Member.findAll({
    order: [["registered_at", "DESC"]],
  }).then((result) => {
    result = result.map((value) => {
      value = value.dataValues;
      convertTimeMember(value);
      return value;
    });
    return result;
  });

  return result;
};

// Service for get member by code
const getMemberByCode = async (code) => {
  if (!(await memberIsExist(code))) {
    throw new NotFoundError("Member is not exist");
  }
  const result = await Member.findOne({ where: { code: code.trim() } }).then(
    (result) => result.dataValues
  );

  convertTimeMember(result);

  return result;
};

// Service for update member
const updateMemberByCode = async (code, member) => {
  if (!(await memberIsExist(code))) {
    throw new NotFoundError("Member is not exist");
  }

  const newMember = await Member.findOne({ where: { code: code.trim() } }).then(
    (result) => result.dataValues
  );

  newMember.code = member.code?.trim() || newMember.code;
  newMember.name = member.name?.trim() || newMember.name;
  newMember.borrowed_count = member.borrowed_count || newMember.borrowed_count;
  newMember.penalty_duration =
    member.penalty_duration || newMember.penalty_duration;

  if (member.code) {
    if ((await memberIsExist(member.code)) && code !== member.code) {
      throw new ConflictError("Member code is already in use");
    }
  }

  const result = await sequelize.transaction(async (t) => {
    const memberResult = await Member.update(
      {
        code: newMember.code,
        name: newMember.name,
        borrowed_count: newMember.borrowed_count,
        penalty_duration: newMember.penalty_duration,
      },
      { where: { code: code.trim() }, returning: true, transaction: t }
    ).then((result) => result[1][0].dataValues);

    return memberResult;
  });

  convertTimeMember(result);

  return result;
};

// Service for delete member
const deleteMemberByCode = async (code) => {
  if (!(await memberIsExist(code))) {
    throw new NotFoundError("Member is not exist");
  }

  const result = await sequelize.transaction(async (t) => {
    const memberResult = await Member.destroy({
      where: { code: code.trim() },
      returning: true,
      transaction: t,
    }).then((result) => result[0].dataValues);

    return memberResult;
  });

  convertTimeMember(result);

  return result;
};

// Service for check existing member
const memberIsExist = async (code) => {
  const member = await Member.findOne({ where: { code } });
  return member !== null;
};

// Service for convert time on object member
const convertTimeMember = (data) => {
  data["registered_at"] = timeToLocaleTime(data, "registered_at");
  data["updated_at"] = timeToLocaleTime(data, "updated_at");

  if (data["unregistered_at"]) {
    data["unregistered_at"] = timeToLocaleTime(data, "unregistered_at");
  }
};

export default {
  addMember,
  getMembers,
  getMemberByCode,
  updateMemberByCode,
  deleteMemberByCode,
};
