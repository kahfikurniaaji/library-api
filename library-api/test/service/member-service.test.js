import ConflictError from "../../src/exception/conflict-error.js";
import NotFoundError from "../../src/exception/not-found-error.js";
import Member from "../../src/model/member.js";
import memberService from "../../src/service/member-service.js";

// Create object member1
const member1 = {
  code: "M001",
  name: "Angga",
};

// Create object member2
const member2 = {
  code: "M002",
  name: "Ferry",
};

// Action before each
beforeEach(async () => {
  await Member.truncate({ force: true, cascade: true });
});

// Test add member service
test("test add member service", async () => {
  const result = await memberService.addMember(member1);

  Object.keys(member1).forEach(async (key) => {
    await expect(result).toHaveProperty(key, member1[key]);
  });

  await expect(
    async () => await memberService.addMember(member1)
  ).rejects.toThrow(ConflictError);
});

// Test get members service
test("test get members service", async () => {
  await memberService.addMember(member1);
  await memberService.addMember(member2);

  let result = await memberService.getMembers();

  // expect(result.length).toBe(2);

  await memberService.deleteMemberByCode(member1.code);

  result = await memberService.getMembers();

  // expect(result.length).toBe(1);
});

// Test get member by code service
test("test get member by code service", async () => {
  await expect(
    async () => await memberService.getMemberByCode(member1.code)
  ).rejects.toThrow(NotFoundError);

  await memberService.addMember(member1);
  await memberService.addMember(member2);
  await memberService.deleteMemberByCode(member2.code);

  const result = await memberService.getMemberByCode(member1.code);

  Object.keys(member1).forEach((key) => {
    expect(result).toHaveProperty(key, member1[key]);
  });

  await expect(
    async () => await memberService.getMemberByCode(member2.code)
  ).rejects.toThrow(NotFoundError);
});

// Test update member by code service
test("test update member by code service", async () => {
  await expect(
    async () => await memberService.updateMemberByCode(member1.code, member2)
  ).rejects.toThrow(NotFoundError);

  await memberService.addMember(member1);

  const member3 = {
    ...member2,
    code: member1.code,
  };

  let result = await memberService.updateMemberByCode(member1.code, member3);

  Object.keys(member3).forEach((key) => {
    expect(result).toHaveProperty(key, member3[key]);
  });

  result = await memberService.updateMemberByCode(member3.code, member2);

  Object.keys(member2).forEach((key) => {
    expect(result).toHaveProperty(key, member2[key]);
  });
});

// Test delete member by code service
test("test delete member by code service", async () => {
  await expect(
    async () => await memberService.deleteMemberByCode(member1.code)
  ).rejects.toThrow(NotFoundError);

  await memberService.addMember(member1);

  const result = await memberService.deleteMemberByCode(member1.code);

  Object.keys(member1).forEach((key) => {
    expect(result).toHaveProperty(key, member1[key]);
  });
});

// Action after each
afterEach(async () => {
  await Member.truncate({ force: true, cascade: true });
});
