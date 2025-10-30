import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
    const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: FormValues) => api.post("/auth/signup", data),
        onSuccess: () => {
            toast.success("Account created. Please login.");
            navigate("/login");
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message || "Signup failed";
            toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Create account</h2>
                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                    <div>
                        <input {...register("name")} placeholder="Full name" className="w-full p-3 border rounded" />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <input {...register("email")} placeholder="Email" className="w-full p-3 border rounded" />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input {...register("password")} type="password" placeholder="Password" className="w-full p-3 border rounded" />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>
                    <button disabled={mutation.isPending} className="w-full p-3 bg-indigo-600 text-white rounded">{mutation.isPending ? 'Creating...' : 'Sign up'}</button>
                </form>
                <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-indigo-600">Sign in</Link></p>
            </motion.div>
        </div>
    );
}