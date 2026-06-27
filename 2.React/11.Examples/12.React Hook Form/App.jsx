import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain one uppercase letter")
      .regex(/[0-9]/, "Password must contain one number"),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    age: z
      .coerce
      .number()
      .min(18, "Age must be at least 18")
      .max(60, "Age must be below 60"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    website: z
      .string()
      .min(1, "Website is required")
      .url("Enter a valid website URL"),

    gender: z.string().min(1, "Gender is required"),

    country: z.string().min(1, "Country is required"),

    skills: z
      .array(z.string())
      .min(1, "Select at least one skill"),

    experience: z.string().min(1, "Experience level is required"),

    bio: z
      .string()
      .min(1, "Bio is required")
      .min(20, "Bio must be at least 20 characters"),

    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ReactHookFormWithZod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      phone: "",
      website: "",
      gender: "",
      country: "",
      skills: [],
      experience: "",
      bio: "",
      terms: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form + Zod</h2>

      <div>
        <label>Full Name</label>
        <input type="text" {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age")} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input type="tel" {...register("phone")} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <label>Website</label>
        <input type="url" {...register("website")} />
        {errors.website && <p>{errors.website.message}</p>}
      </div>

      <div>
        <label>Gender</label>

        <label>
          <input type="radio" value="male" {...register("gender")} />
          Male
        </label>

        <label>
          <input type="radio" value="female" {...register("gender")} />
          Female
        </label>

        <label>
          <input type="radio" value="other" {...register("gender")} />
          Other
        </label>

        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <select {...register("country")}>
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
        <label>Skills</label>

        <label>
          <input type="checkbox" value="React" {...register("skills")} />
          React
        </label>

        <label>
          <input type="checkbox" value="JavaScript" {...register("skills")} />
          JavaScript
        </label>

        <label>
          <input type="checkbox" value="TypeScript" {...register("skills")} />
          TypeScript
        </label>

        {errors.skills && <p>{errors.skills.message}</p>}
      </div>

      <div>
        <label>Experience Level</label>
        <select {...register("experience")}>
          <option value="">Select experience</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior</option>
        </select>
        {errors.experience && <p>{errors.experience.message}</p>}
      </div>

      <div>
        <label>Bio</label>
        <textarea {...register("bio")} />
        {errors.bio && <p>{errors.bio.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("terms")} />
          I accept terms and conditions
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReactHookFormWithZod;