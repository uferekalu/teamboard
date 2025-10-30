import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const schema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters long."),
        email: z.string().email("Please provide a valid email address."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                "Password too weak. Must include uppercase, lowercase, number, and special character."
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    const { token } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (token) navigate("/", { replace: true });
    }, [token, navigate]);


    const mutation = useMutation({
        mutationFn: (data: FormValues) =>
            api.post("/auth/signup", {
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        onSuccess: () => {
            toast.success("🎉 Account created successfully! Please log in to continue.");
            navigate("/login");
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message;
            if (Array.isArray(msg)) {
                msg.forEach((m) => toast.error(m));
            } else {
                toast.error(msg || "Something went wrong. Please try again.");
            }
        },
    });

    const onSubmit = (data: FormValues) => {
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) {
            toast.error("Please fix the highlighted errors before submitting.");
            return;
        }

        mutation.mutate(data);
    };

    return (
        <AuthLayout
            variant="signup"
            title="Create Your Account"
            subtitle="Join TeamBoard today and take control of your work management."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                    <input
                        {...register("name")}
                        placeholder="Full name"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        {...register("confirmPassword")}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    disabled={mutation.isPending}
                    className="w-full p-3 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition font-medium shadow-sm disabled:opacity-70"
                >
                    {mutation.isPending ? "Creating Account..." : "Sign up"}
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-600 hover:underline font-medium">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}
