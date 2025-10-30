import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
    const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: FormValues) => api.post("/auth/login", data),
        onSuccess: (res) => {
            const token = res.data.access_token;
            login(token);
            toast.success("Logged in");
            navigate("/");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Login failed");
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                    <div>
                        <input {...register("email")} placeholder="Email" className="w-full p-3 border rounded" />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input {...register("password")} type="password" placeholder="Password" className="w-full p-3 border rounded" />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <button disabled={mutation.isPending} className="w-full p-3 bg-indigo-600 text-white rounded">
                        {mutation.isPending ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
                </p>
            </motion.div>
        </div>
    );
}