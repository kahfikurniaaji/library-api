import { Router } from "express";
import memberController from "../controller/member-controller.js";

const memberRouter = Router();

const endpoint = "/members";

memberRouter.post(endpoint, memberController.postNewMember);

memberRouter.get(endpoint, memberController.getMembers);

memberRouter.get(endpoint + "/:memberCode", memberController.getMemberByCode);

memberRouter.put(endpoint + "/:memberCode", memberController.putMemberByCode);

memberRouter.delete(
  endpoint + "/:memberCode",
  memberController.deleteMemberByCode
);

export default memberRouter;
