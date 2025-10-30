export type Project = {
    _id: string;
    name: string;
    description?: string;
    owner: string;
};

export type Task = {
    _id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    project: string;
};