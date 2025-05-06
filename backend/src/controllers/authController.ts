import express, {Request, Response} from "express";
import AuthService from "../services/authService";
const authService = new AuthService(); // create instance OUTSIDE the class

export default class TaskController {

    private authService: AuthService;

    constructor() {
        this.authService = authService;  // assign to class-level property
    }

    // public healthCheck = async (req: express.Request, res: express.Response) => {
    //     try {
    //         const result =await this.taskService.healthCheck(req);
    //         res.status(200).json({status:"success", message: "checking helath. OK.", data:{} });
    //     } catch (error) {
    //         console.error("Error in healthCheck:", error);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // }

    // public tasks = async (req: express.Request, res: express.Response) => {
    //     try {
    //         const result =await this.taskService.tasks(req);
    //         res.status(200).json({status:"success", message:result.message, data:result.data });
    //     } catch (error) {
    //         console.error("Error in tasks:", error);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // }

    public register = async (req: express.Request, res: express.Response) => {
        try {
            const result =await this.authService.register(req);
            res.status(200).json({status:"success", message:result.message, data:result.data });
        } catch (error) {
            console.error("Error in user registration:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public login = async (req: Request, res: Response): Promise<void>  => {
        try {
            const result =await this.authService.login(req);
            res.status(result.status).json({status:"success", message:result.message, data:result.data });
        } catch (error) {
            console.error("Error while logging in:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}