import RoomCategoryService from "../../services/RoomCategory";
import { Request, Response } from "express";
import Dispatcher from "../../utils/dispatcher";

export default class RoomCategoryController {
    static async createCategory(req: Request, res: Response) {
        try {
        const data = req.body;
        const category = await RoomCategoryService.createCategory(data);
        Dispatcher.DispatchSuccessMessage(res, "Category created successfully", category);
        } catch (error: any) {
        Dispatcher.DispatchErrorMessage(res, error);
        }
    }
    static async getCategories(req: Request, res: Response) {
        try {
        const categories = await RoomCategoryService.getCategories();
        Dispatcher.DispatchSuccessMessage(res, "Categories fetched successfully", categories);
        } catch (error: any) {
        Dispatcher.DispatchErrorMessage(res, error);
        }
    }
    static async getCategoryById(req: Request, res: Response) {
        try {
        const id = req.params.id;
        const category = await RoomCategoryService.getCategoryById(id);
        Dispatcher.DispatchSuccessMessage(res, "Category fetched", category);
        } catch (error: any) {
        Dispatcher.DispatchErrorMessage(res, error);
        }
    }
    static async updateCategory(req: Request, res: Response) {
        try {
        const id = req.params.id;
        const data = req.body;
        const category = await RoomCategoryService.updateCategory(id, data);
        Dispatcher.DispatchSuccessMessage(res, "Category successfully updated", category);
        } catch (error: any) {
        Dispatcher.DispatchErrorMessage(res, error);
        }
    }
    static async deleteCategory(req: Request, res: Response) {
        try {
        const id = req.params.id;
        const category = await RoomCategoryService.deleteCategory(id);
        Dispatcher.DispatchSuccessMessage(res, "Category deleted", category);
        } catch (error: any) {
        Dispatcher.DispatchErrorMessage(res, error);
        }
    }
    }