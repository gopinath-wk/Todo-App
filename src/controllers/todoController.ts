import { Request, Response } from "express";
import Todo from "../models/Todo.js";




export const getTodos = async (req:Request,res:Response)=>{
  try{
    const ownerId = (req as any).userId;
    if (!ownerId) return res.status(401).json({ message: "Unauthorized" });
    const todos= await Todo.find({ owner: ownerId });
    res.json(todos);
  }catch(err){
  console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const addTodo = async(req: Request, res: Response) => {
  try{
    const {text} = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }
  const ownerId = (req as any).userId;
  if (!ownerId) return res.status(401).json({ message: "Unauthorized" });
  const new_todo = new Todo({ text: text.trim(), owner: ownerId });
    await new_todo.save();

    res.status(201).json(new_todo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const toggleTodo = async(req: Request, res: Response) => {
  try {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Missing id parameter" });
  const ownerId = (req as any).userId;
  if (!ownerId) return res.status(401).json({ message: "Unauthorized" });
  const todo = await Todo.findById(id);

  if(!todo) return res.status(404).json({message:"Todo not found"});

  if (todo.owner.toString() !== ownerId) return res.status(403).json({ message: "Forbidden" });

  todo.completed = !todo.completed;
  await todo.save();
   res.json(todo);
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async(req: Request, res: Response) => {
  try {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Missing id parameter" });
  const ownerId = (req as any).userId;
  if (!ownerId) return res.status(401).json({ message: "Unauthorized" });
    
     const todo = await Todo.findById(id);
     if (!todo) return res.status(404).json({ message: "Todo not found" });
     if (todo.owner.toString() !== ownerId) return res.status(403).json({ message: "Forbidden" });
     await Todo.findByIdAndDelete(id);
res.json({ message: "Todo deleted" });
     
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
