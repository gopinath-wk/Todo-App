import mongoose,{Schema,Document} from "mongoose";

export interface ITodo extends Document{
  text:string;
  completed:boolean;
}

const todoSchema:Schema=new Schema({
  text:{type:String,required:true},
  completed:{type:Boolean,default:false}
});

const Todo = mongoose.model<ITodo>("Todo",todoSchema);
export default Todo;