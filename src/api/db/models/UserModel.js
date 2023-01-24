import BaseModel from "@/api/db/models/BaseModel"

class UserModel extends BaseModel {
  static tableName = "users"
}

export default UserModel
