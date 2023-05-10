import memberService from "../service/member-service.js";

// Controller for add new member
const postNewMember = async (req, res, next) => {
  const result = await memberService
    .addMember(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for get all members
const getMembers = async (req, res, next) => {
  const result = await memberService
    .getMembers()
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get member by code
const getMemberByCode = async (req, res, next) => {
  const result = await memberService
    .getMemberByCode(req.params.memberCode)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get member by code
const putMemberByCode = async (req, res, next) => {
  const result = await memberService
    .updateMemberByCode(req.params.memberCode, req.body)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for delete member by code
const deleteMemberByCode = async (req, res, next) => {
  const result = await memberService
    .deleteMemberByCode(req.params.memberCode)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  postNewMember,
  getMembers,
  getMemberByCode,
  putMemberByCode,
  deleteMemberByCode,
};
