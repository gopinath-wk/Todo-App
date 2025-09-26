import mongoose,{Schema,Document} from "mongoose";

export interface ITodo extends Document{
  text:string;
  completed:boolean;
  owner: mongoose.Types.ObjectId;
}

const todoSchema:Schema=new Schema({
  text:{type:String,required:true},
  completed:{type:Boolean,default:false},
  owner:{ type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Todo = mongoose.model<ITodo>("Todo",todoSchema);
export default Todo;