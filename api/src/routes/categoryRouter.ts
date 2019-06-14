import express, { Request, Response } from "express";
import { IApiResponse, IApiRequest } from "../interfaces/ApiInterface";
import { getConnection, Repository } from "typeorm";
import Category from "../entity/Category";

let repository: Repository<Category>;

const router = express.Router();

const initialize = () => {
    const connection = getConnection();
    repository = connection.getRepository(Category);
};

router.get("/", (req: Request, res: Response) => {
    if (repository === undefined) {
        initialize();
    }
    const response: IApiResponse = { success: true, categories: [] };
    repository.find()
        .then((val: Category[]) => {
            response.categories = val;
        })
        .catch(() => {
            response.success = false;
            response.message = "Problem retrieving categories.";
        })
        .finally(() => {
            res.send(response);
        });
});

router.get("/:id", (req: Request, res: Response) => {
    if (req.params.id !== undefined && req.params.id !== null) {
        if (repository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        repository.findOne(Number(req.params.id))
            .then((found: Category | undefined) => {
                if (found !== undefined) {
                    response.category = found;
                    response.success = true;
                } else {
                    response.success = false;
                    response.message = "Category with this id not found.";
                }
            })
            .catch(() => {
                response.success = false;
                response.message = "Problem performing search of category.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

router.post("/", (req: Request, res: Response) => {
    const request: IApiRequest = req.body as IApiRequest;
    if (request !== undefined && request !== null
        && request.category !== undefined && request.category !== null) {
        if (repository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        repository.save(new Category(request.category.id, request.category.name))
            .then((val: Category) => {
                response.category = val;
            })
            .catch(() => {
                response.success = false;
                response.message = "Problem saving category.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No category provided" } as IApiResponse);
    }
});

router.put("/:id", (req: Request, res: Response) => {
    const request: IApiRequest = req.body as IApiRequest;
    if (request !== undefined && request !== null
        && req.params.id !== undefined && req.params.id !== null) {
        if (repository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        repository.findOne(Number(req.params.id))
            .then((found: Category | undefined) => {
                if (found !== undefined && request.category) {
                    response.category = repository.merge(found, new Category(found.id, request.category.name));
                    repository.save(response.category);
                } else {
                    response.success = false;
                    response.message = !request.category ? "Update not provided." : "Category Id not found.";
                }
            })
            .catch(() => {
                response.category = undefined;
                response.success = false;
                response.message = "Problem performing search of category.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    if (req.params.id !== undefined && req.params.id !== null) {
        if (repository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        repository.findOne(Number(req.params.id))
            .then((found: Category | undefined) => {
                if (found !== undefined) {
                    repository.delete(found.id as number);
                    response.success = true;
                } else {
                    response.success = false;
                    response.message = "Category id to delete not found.";
                }
            })
            .catch(() => {
                response.success = false;
                response.message = "Problem performing search of category.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

export default router;
