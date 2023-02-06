import BaseModel from "@/api/db/models/BaseModel"
import UserModel from "@/api/db/models/UserModel"

class PostModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default PostModel
