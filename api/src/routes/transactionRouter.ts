import express, { Request, Response } from "express";
import { IApiResponse, IApiRequest, ITransaction } from "../interfaces/ApiInterface";
import { getConnection, Repository } from "typeorm";
import Transaction from "../entity/Transaction";
import Category from "../entity/Category";

let categoryRepository: Repository<Category>;

let transactionRepository: Repository<Transaction>;

const router = express.Router();

const initialize = () => {
    const connection = getConnection();
    transactionRepository = connection.getRepository(Transaction);
    categoryRepository = connection.getRepository(Category);
};

router.get("/", (req: Request, res: Response) => {
    if (transactionRepository === undefined) {
        initialize();
    }
    const response: IApiResponse = { success: true, transactions: [] };
    transactionRepository.find({ relations: ["category"]})
        .then((val: Transaction[]) => {
            response.transactions = val;
        })
        .catch(() => {
            response.success = false;
            response.message = "Problem retrieving transactions.";
        })
        .finally(() => {
            res.send(response);
        });
});

router.get("/:id", (req: Request, res: Response) => {
    if (req.params.id !== undefined && req.params.id !== null) {
        if (transactionRepository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        transactionRepository.findOne(Number(req.params.id))
            .then((found: Transaction | undefined) => {
                if (found !== undefined) {
                    response.transaction = found;
                    response.success = true;
                } else {
                    response.success = false;
                    response.message = "Transaction with this id not found.";
                }
            })
            .catch(() => {
                response.success = false;
                response.message = "Problem performing search of transaction.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const request: IApiRequest = req.body as IApiRequest;
        if (request !== undefined && request !== null
            && request.transaction !== undefined && request.transaction !== null) {
            if (transactionRepository === undefined) {
                initialize();
            }
            const response: IApiResponse = { success: true };

            const problems: string[] = [];

            const foundCategory: Category | undefined = await categoryRepository.findOne(Number(request.transaction.category.id));

            if (foundCategory === undefined) {
                problems.push("Category Id provided with transaction isn't found.");
            }
            if (request.transaction.name === undefined || request.transaction.name === null || request.transaction.name.length === 0) {
                problems.push("Name is required on transaction.");
            }
            if (request.transaction.amount === undefined || request.transaction.amount === null && isNaN(request.transaction.amount)) {
                problems.push("Amount is required on transaction.");
            }

            if (problems.length === 0) {
                const amount: number = (typeof request.transaction.amount === "string") ?
                    Number.parseFloat(request.transaction.amount) : request.transaction.amount;
                const val: Transaction | undefined =
                    await transactionRepository.save(new Transaction(
                        foundCategory as Category,
                        request.transaction.name,
                        amount));
                response.transaction = val;
            } else {
                response.success = false;
                response.message = problems.join(" ");
            }
            res.send(response);
        } else {
            res.send({ success: false, message: "No transaction provided" } as IApiResponse);
        }
    } catch (err) {
        res.send({ success: false, message: "Caught error." } as IApiResponse);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const request: IApiRequest = req.body as IApiRequest;
    if (request && request.transaction && request.transaction.category.id && req.params.id ) {
        const transaction: ITransaction | undefined = request.transaction;

        const response: IApiResponse = { success: true };

        if (transaction !== undefined) {
            if (transactionRepository === undefined || categoryRepository === undefined) {
                initialize();
            }

            const problems: string[] = [];

            const foundCategory: Category | undefined = await categoryRepository.findOne(transaction.category.id);

            if (foundCategory === undefined) {
                problems.push("Category Id provided with transaction isn't found.");
            }
            if (transaction.name === undefined || transaction.name === null || transaction.name.length === 0) {
                problems.push("Name is required on transaction.");
            }
            if (transaction.amount === undefined || transaction.amount === null && isNaN(transaction.amount)) {
                problems.push("Amount is required on transaction.");
            }

            if (problems.length === 0) {
                const found: Transaction | undefined = await transactionRepository.findOne(Number(req.params.id));
                if (found !== undefined) {
                    const amount: number = (typeof request.transaction.amount === "string") ?
                        Number.parseFloat(request.transaction.amount) : request.transaction.amount;
                    const mergedTransaction: Transaction = transactionRepository.merge(
                        found,
                        new Transaction(
                            foundCategory as Category, transaction.name, amount));
                    transactionRepository.save(mergedTransaction);
                    response.transaction = mergedTransaction;
                } else {
                    response.success = false;
                    response.message = "Transaction to edit not found.";
                }
            } else {
                response.success = false;
                response.message = problems.join(" ");
            }
        } else {
            response.success = false;
            response.message = "No transaction data provided.";
        }
        res.send(response);
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    if (req.params.id !== undefined && req.params.id !== null) {
        if (transactionRepository === undefined) {
            initialize();
        }
        const response: IApiResponse = { success: true };
        transactionRepository.findOne(Number(req.params.id))
            .then((found: Transaction | undefined) => {
                if (found !== undefined) {
                    transactionRepository.delete(found.id as number);
                    response.success = true;
                } else {
                    response.success = false;
                    response.message = "Transaction id to delete not found.";
                }
            })
            .catch(() => {
                response.success = false;
                response.message = "Problem performing search of transaction.";
            })
            .finally(() => {
                res.send(response);
            });
    } else {
        res.send({ success: false, message: "No Id provided." } as IApiResponse);
    }
});

export default router;
